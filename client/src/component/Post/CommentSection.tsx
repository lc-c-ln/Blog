import axios from "axios";
import React, { useState, useEffect } from "react";
import { getComments } from "../../api/api";
import Comment from "./Comment";
import styles from "./commentSection.module.css";

interface props {
  postId: number;
}

// comment 전체 섹션
export default function CommentSection({ postId }: props) {
  const [commentList, setCommentList] = useState([]);
  const [commentToggle, setCommentToggle] = useState(false);

  const createComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const writer = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;
    
    axios
      .post(`//${process.env.REACT_APP_API_SERVER_URL}/comment`, {
        post_id: postId,
        parrent_comment_id: null,
        content: content,
        writer: writer,
        password: password,
      })
      .then((res) => {
        getCommentList();
      });
  };

  const getCommentList = () => {
    getComments(postId).then((res) => {
      setCommentList(res.data);
    });
  };

  useEffect(() => {
    getCommentList();
  }, []);


  const comments = (commentToggle ? commentList : commentList.slice(0, 5)).map(
    (comment) => {
      return <Comment comment={comment} postId={postId} />;
    }
  );

  return (
    <section className={styles.CommentSection}>
      <form onSubmit={createComment}>
        <input
          className={styles.Content}
          type="text"
          name="content"
          placeholder="댓글을 입력해주세요"
        />
        <input
          className={styles.WriterPassword}
          type="text"
          name="writer"
          placeholder="작성자의 아이디를 입력하세요"
        />
        <input
          className={styles.WriterPassword}
          type="password"
          name="password"
          placeholder="수정/삭제를 위한 비밀번호를 입력하세요"
        />
        <button>댓글 달기</button>
      </form>
      <ul>{comments}</ul>
      {commentToggle ? (
        <></>
      ) : (
        <div onClick={() => setCommentToggle(true)}>전체 댓글 더보기</div>
      )}
    </section>
  );
}
