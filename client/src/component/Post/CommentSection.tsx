import axios from "axios";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import styles from "./commentSection.module.css";

interface props {
  postId: number;
}

export default function CommentSection(props: props) {
  const [commentList, setCommentList] = useState([]);

  const createOrdinaryComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const writer = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;

    axios
      .post(`//${process.env.REACT_APP_API_SERVER_URL}/comment`, {
        post_id: props.postId,
        parrent_comment_id: null,
        content: content,
        writer: writer,
        password: password,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const getCommentList = () => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/comment`, {
        params: {
          post_id: props.postId,
          page: 1,
        },
      })
      .then((res) => {
        setCommentList(res.data);
      });
  };
  useEffect(() => {}, []);

  const comments = commentList.map((comment) => {
    return <Comment comment={comment} postId={props.postId} />;
  });

  return (
    <div className={styles.CommentSection}>
      <form onSubmit={createOrdinaryComment}>
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
    </div>
  );
}
