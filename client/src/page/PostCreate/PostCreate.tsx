import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './postCreate.module.css'

export default function PostCreate() {
  const [inputs, setInputs] = useState({
    title: "",
    writer: "",
    password: "",
    content: "",
    hashtag: "",
  });
  const navigate = useNavigate()

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const createPostHandle = (e: FormEvent) => {
    e.preventDefault(); 
    axios.post(`//${process.env.REACT_APP_API_SERVER_URL}/post`, {
      ...inputs
    }).then(()=>
      navigate("/")
    )
  };

  return (
    <div className={styles.Container}>
      <form action="" onSubmit={createPostHandle} >
        <label>
          제목:
          <input type="text" name="title" required onChange={onChange} />
        </label>
        <label className={styles.inline}>
          작성자:
          <input type="text" name="writer" required onChange={onChange} />
        </label>
        <label className={styles.inline}>
          비밀번호:
          <input type="password" name="password" required onChange={onChange} />
        </label>
        <label className={styles.Content}>
          내용 :
          <textarea name="content" required onChange={onChange} />
        </label>
        <label>
          해쉬태그:
          <input type="text" name="hashtag" onChange={onChange} />
        </label>
        <button>글 등록하기</button>
      </form>
    </div>
  );
}
