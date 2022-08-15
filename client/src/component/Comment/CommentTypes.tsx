import React from "react";
import styles from "./comments.module.css";
import { deleteComment } from "../../api/api";

interface props {
  comment: never;
}

export function DeletedComment({ comment }: props) {
  return (
    <li key={comment["id"]} className={styles.Comment}>
      <div>
        ㄴ <p>삭제된 댓글 입니다.</p>
      </div>
    </li>
  );
}

export const BasicComment = ({ comment }: props) => {
  const deleteCommentHandler = () => {
    const password = prompt("비밀번호를 입력하세요");
    if (password !== null) {
      deleteComment(comment["id"], password);
    }
  };

  return (
    <li key={comment["id"]} className={styles.Comment}>
      <div>
        <p>{comment["content"]}</p>
        <p>작성자: {comment["writer"]}</p>
        <button onClick={deleteCommentHandler}>삭제</button>
      </div>
    </li>
  );
};

export const ParentComment = ({ comment }: props) => {
  return (
  <li key={comment["id"]} className={styles.Comment}>
    <div>
      <p>{comment["content"]}</p>
      <p>작성자: {comment["writer"]}</p>
    </div>
  </li>)
};
