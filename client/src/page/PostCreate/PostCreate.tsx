import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./postCreate.module.css";
import HashtagInput from "../../component/PostCreate/HashtagInput";
import { createPost } from "../../api/api";
export default function PostCreate() {
  // redux 에서 user 정보 가져와서 user_id로 받아야 함.
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    user_id: 0,
  });
  const [hashtagList, setHashtagList] = useState<string[]>([]);

  const navigate = useNavigate();

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const createPostHandle = (e: FormEvent) => {
    e.preventDefault();
    createPost(inputs.title, inputs.content, inputs.user_id, hashtagList)
      .then(() => navigate("/"));
  };

  return (
    <div className={styles.Container}>
      <form id="newPost" onSubmit={createPostHandle} className={styles.Form}>
        <label>
          제목:
          <input type="text" name="title" required onChange={onChange} />
        </label>
        <label className={styles.inline}>
          작성자:
          <input type="text" name="writer" required onChange={onChange} />
        </label>
        <label className={styles.Content}>
          내용 :
          <textarea name="content" required onChange={onChange} />
        </label>
        </form>
        <label>
          해쉬태그:
          <HashtagInput
            hashtagList={hashtagList}
            setHashtagList={setHashtagList}
          />
        </label>
        <button type="submit" form="newPost">글 등록하기</button>
    </div>
  );
}
