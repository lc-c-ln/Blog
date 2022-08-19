import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "../../component/Post/CommentSection";
import styles from "./post.module.css";

export default function Post() {
  const param = useParams();
  const post_Id = param.post_id !== undefined ? parseInt(param.post_id) : 0;
  const nav = useNavigate()
  const [postData, setPostData] = useState({
    title: "",
    writer: "",
    reg_date: "",
    content: "",
    comment_cnt: 0,
    view_cnt: 0,
    like_cnt: 0,
  });

  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/post`, {
        params: {
          post_id: param.post_id,
        },
      })
      .then((res) => {
        setPostData({
          ...res.data,
        });
      });
  }, []);

  const updatePost = () => {
    const password = prompt("수정을 위한 비밀번호를 입력하세요")
    axios.get(`//${process.env.REACT_APP_API_SERVER_URL}/auth`, {
      params: {
        id: post_Id,
        password: password
      }
    }).then((res)=>{
      if (res.status === 200) {
        nav(`/post/update/${post_Id}`)
      } else {  
        alert("비밀번호가 틀렸습니다.")
      }
    })
  }

  const deletePost = () => {
    const password = prompt("비밀번호를 입력하세요")
    axios.delete(`//${process.env.REACT_APP_API_SERVER_URL}/post`, {
      data: {
        id: post_Id,
        password: password
      }
    }).then((res) => {
      if (res.status === 200) {
        alert("게시물이 삭제되었습니다.")
        nav("/")
      } else {
        alert("비밀번호가 틀렸습니다.")
      }
    })
  }

  return (
    <div className={styles.Post}>
      <div className="">
        <h2>{postData.title}</h2>
        <div>
          <button onClick={updatePost}>수정</button>
          <button onClick={deletePost}>삭제</button>
        </div>
        <p>
          작성자: {postData.writer}
          <br />
          작성일시: {postData.reg_date}
        </p>
      </div>
      <div className={styles.Content}>{postData.content}</div>
      <div>
        <CommentSection postId={post_Id} />
      </div>
      <ul></ul>
    </div>
  );
}
