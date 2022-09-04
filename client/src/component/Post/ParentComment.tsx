import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./comment.module.css";

import { DeletedComment, BasicComment } from "./Comment/CommentTypes";
import { createComment } from "../../api/api";

interface props {
  comment: never;
  postId: number;
}

export default function ParentComment({ comment, postId }: props) {
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
    createComment(
      postId,
      content,
      parseInt(e.currentTarget.id),
      writer,
      password
    ).then(() => getChildCommentList());
  };

  const childCommets = childCommentList.map((comment) => {
    return comment["deleted"] ? (
      <DeletedComment comment={comment} />
    ) : (
      <BasicComment comment={comment} />
    );
  });

  return (
    <>
      {comment["deleted"] ? (
        <DeletedComment comment={comment} />
      ) : (
        <BasicComment comment={comment} />
      )}

      <ul>{childCommets}</ul>

      <form
        onSubmit={createChildComment}
        id={comment["id"]}
        className={styles.ChildCommentForm}
      >
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
    </>
  );
}
