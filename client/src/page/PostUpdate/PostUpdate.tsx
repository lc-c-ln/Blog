import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from './postUpdate.module.css'


export default function PostUpdate() {
  const param =useParams()  
  const [inputs, setInputs] = useState({
    title: "",
    writer: "",
    password: "",
    content: "",
    hashtag: "",
  });
  
  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/post`, {
        params: {
          post_id: param.post_id,
        },
      })
      .then((res) => {        
        setInputs({
          ...res.data,
          password:""
        });
      });
  }, []);
  console.log(inputs);


  const navigate = useNavigate()

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const updatePostHandle = (e: FormEvent) => {
    e.preventDefault(); 
    console.log({...inputs}, "맞아");
    
    axios.put(`//${process.env.REACT_APP_API_SERVER_URL}/post`, {
      ...inputs
    }).then(()=>
      navigate("/")
    )
  };

  return (
    <div className={styles.Container}>
      <form action="" onSubmit={updatePostHandle} >
        <label>
          제목:
          <input type="text" name="title" required onChange={onChange} value={inputs.title}/>
        </label>
        <label className={styles.inline}>
          작성자:
          <input type="text" name="writer" required onChange={onChange} value={inputs.writer}/>
        </label>
        <label className={styles.inline} >
          비밀번호:
          <input type="password" name="password" required onChange={onChange} value={inputs.password}/>
        </label>
        <label className={styles.Content}>
          내용 :
          <textarea name="content" required onChange={onChange} value={inputs.content}/>
        </label>
        <label>
          해쉬태그:
          <input type="text" name="hashtag" onChange={onChange} />
        </label>
        <button>수정하기</button>
      </form>
    </div>
  );
}
