import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateLikeCount } from "../../api/api";
import CommentSection from "../../component/Post/CommentSection";
import styles from "./post.module.css";

export default function Post() {
  const param = useParams();
  const post_Id = param.post_id !== undefined ? parseInt(param.post_id) : 0;
  const nav = useNavigate();
  const [, forceUpdate] = useState();

  const [postData, setPostData] = useState({
    title: "",
    writer: "",
    reg_date: "",
    content: "",
    comment_cnt: 0,
    view_cnt: 0,
    like_cnt: 0,
    hashtagList: [],
  });

  const getPostData = () => {
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
  };

  useEffect(() => {
    getPostData();
  }, []);

  const updatePost = () => {
    const password = prompt("수정을 위한 비밀번호를 입력하세요");
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/auth/post`, {
        params: {
          id: post_Id,
          password: password,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          nav(`/post/update/${post_Id}`);
        } else {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };

  const deletePost = () => {
    const password = prompt("비밀번호를 입력하세요");
    axios
      .delete(`//${process.env.REACT_APP_API_SERVER_URL}/post`, {
        data: {
          id: post_Id,
          password: password,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("게시물이 삭제되었습니다.");
          nav("/");
        } else {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };
  const updateLikeCountHandler = async (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as any).id === "countUp") {
      await updateLikeCount(post_Id, 1);
    } else {
      await updateLikeCount(post_Id, -1);
    }
    getPostData();
  };

  return (
    <div className={styles.Post}>
      <div className="">
        <h2>{postData.title}</h2>
        <div>
          <button onClick={updateLikeCountHandler} id="countUp">
            UP
          </button>
          {postData.like_cnt}
          <button onClick={updateLikeCountHandler} id="countDown">
            DOWN
          </button>
        </div>
        <div>
          <button onClick={updatePost}>수정</button>
          <button onClick={deletePost}>삭제</button>
        </div>
        <p>
          작성자: {postData.writer}
          <br />
          작성일시: {postData.reg_date}
        </p>
        <ul className={styles.Hashtags}>
          {postData.hashtagList.map((tag) => {
            return (
              <li>
                <Link to="/">#{tag}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.Content}>{postData.content}</div>
      <CommentSection postId={post_Id} />
    </div>
  );
}
