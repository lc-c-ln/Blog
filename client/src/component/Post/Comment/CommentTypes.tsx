import React from "react";
import styles from "./comments.module.css";
import { deleteComment } from "../../../api/api";

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
  const deleteCommentHandler = async () => {
    const password = prompt("비밀번호를 입력하세요");
    if (password !== null) {
      const response = await deleteComment(comment["id"], password)
      if (response === 200) {
            alert("삭제되었습니다.");
            window.location.reload();
          } else if (response === 401) {
            alert("잘못된 비밀번호입니다.");
          } else {
            alert("서버 에러")
          }
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
