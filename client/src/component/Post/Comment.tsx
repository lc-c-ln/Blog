import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./comment.module.css";

interface props {
  comment: never;
  postId: number;
}

interface childCommentProps {
  comment: never;
}

const ChildComment = ({ comment }: childCommentProps) => {
  return (
    <li key={comment["id"]} className={styles.ChildComment}>
      {comment["content"]}
      {comment["content"]}
      {comment["writer"]}
    </li>
  );
};

export default function Comment({ comment, postId }: props) {
  const [childCommentList, setChildCommentList] = useState([]);
  const getChildCommentList = () => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/comment`, {
        params: { post_id: postId, parent_comment_id: comment["id"] },
      })
      .then((res) => {
        setChildCommentList(res.data);
      });
  };

  useEffect(() => {
    getChildCommentList();
  }, []);

  const createChildComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const writer = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;
    axios
      .post(`//${process.env.REACT_APP_API_SERVER_URL}/comment`, {
        post_id: postId,
        parent_comment_id: e.currentTarget.id,
        content: content,
        writer: writer,
        password: password,
      })
      .then(() => getChildCommentList());
  };

  const childCommets = childCommentList.map((comment) => {
    return <ChildComment comment={comment} />;
  });

  return (
    <li key={comment["id"]} className={styles.ParentComment}>
      {comment["content"]}
      {comment["content"]}
      {comment["writer"]}
      <ul>{childCommets}</ul>

      <form
        onSubmit={createChildComment}
        id={comment["id"]}
        className={styles.ChildCommentForm}
      >
        <input type="text" name="content" placeholder="댓글을 입력해주세요" />
        <input
          type="text"
          name="writer"
          placeholder="작성자의 아이디를 입력하세요"
        />
        <input
          type="text"
          name="password"
          placeholder="수정/삭제를 위한 비밀번호를 입력하세요"
        />
        <button>댓글</button>
      </form>
    </li>
  );
}
