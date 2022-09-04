import React, { useState, useEffect } from "react";
import { getComments, createComment } from "../../api/api";
import ParentComment from "./ParentComment";
import styles from "./commentSection.module.css";

interface props {
  postId: number;
}

// comment 전체 섹션
export default function CommentSection({ postId }: props) {
  const [commentList, setCommentList] = useState([]);
  const [commentToggle, setCommentToggle] = useState(false);

  const onCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const writer = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;

    createComment(postId,content, null ,writer,password)
      .then(() => {
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
      return <ParentComment comment={comment} postId={postId} />;
    }
  );

  return (
    <section className={styles.CommentSection}>
      <form onSubmit={onCreateComment}>
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
