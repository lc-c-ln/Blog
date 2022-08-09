import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

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
  axios.get(`//${process.env.REACT_APP_API_SERVER_URL}/post`,{
    params:{
      post_id: param.post_id
    }
  }).then((res)=>{
    console.log(res.data);
  })

  return <div>param</div>;
}
