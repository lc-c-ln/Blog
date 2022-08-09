import React, { FormEvent, useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [inputs, setInputs] = useState({
    title: "",
    writer: "",
    password: "",
    content: "",
    hashtag: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };
  const createPostHandle = (e: FormEvent) => {
    e.preventDefault();
    
    axios.post(`//${process.env.REACT_APP_API_SERVER_URL}/post`, {
      ...inputs
    }).then((res)=>{
      console.log(res);
      
    }
    );

  };
  return (
    <div>
      <form action="" onSubmit={createPostHandle}>
        <label>
          제목:
          <input type="text" name="title" required onChange={onChange} />
        </label>
        <label>
          작성자:
          <input type="text" name="writer" required onChange={onChange} />
        </label>
        <label>
          비밀번호:
          <input type="password" name="password" required onChange={onChange} />
        </label>
        <label>
          내용 :
          <input type="text" name="content" required onChange={onChange} />
        </label>
        <label>
          해쉬태그:
          <input type="text" name="hashtag" onChange={onChange} />
        </label>
        <button></button>
      </form>
    </div>
  );
}
