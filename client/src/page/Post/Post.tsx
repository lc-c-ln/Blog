import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PostData {
  title:string,
  writer:string,
  reg_date:Date,
  content:string
}

export default function Post() {
  // post_id
  const param = useParams();
  // const getPostData = () =>{
  //   axios.get(`${process.env.REACT_APP_API_SERVER_URL}/post`,{
  //     params:{
  //       post_id: param.post_id
  //     }
  //   }).then((res)=>{
  //     console.log(res);
  //   })
  // }
  const [postData, setPostData] = useState({
    title:"",
    writer:"",
    reg_date:"",
    content:"",
    comment_cnt:0,
    view_cnt:0,
    like_cnt:0
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
        console.log(postData);        
      });
  },[]);

  return (
    <div>
      <h1>{postData.title}</h1>
      <div>
        {postData.content}
        {postData.reg_date}
        </div>      
    </div>
  );
}
