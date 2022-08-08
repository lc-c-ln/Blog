import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PostList() {
  // 전체 게시물 개수 가져오기
  // 페이지 바뀌기 누를 때 마다, 전체 페이지 수 가져오고, 밑에 있는 버튼들
  // post들 가져오기
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [postList, setPostList] = useState([]); // 현재 페이지의 post들의 정보를 가진 data

  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/postlist`, {
        params: {
          page: currentPage,
        },
      })
      .then((res) => {
        setTotalPageNum(Math.floor(res.data.cnt[0].cnt / 10) + 1);
        setPostList(res.data.page);
      });
  }, [currentPage]);

  const posts = postList.map((post) => {
    console.log(post);
    return (
      <li>
        {post["title"]}
        {post["writer"]}        
        {post["reg_date"]}
        댓글 수: {post["comment_cnt"]} 
        조회 수: {post["view_cnt"]} 
        좋아요 수: {post["like_cnt"]} 
      </li>
    );
  });

  const pageButtons = [...Array(10)].map((num, idx) => {
    const page = Math.floor((currentPage-1) / 10) + idx + 1; 
    return (
      <li
        key={page}
        style={{
          display: `${page <= totalPageNum ? "inline-block" : "none"}`,
        }}
        onClick={() => {
          setCurrentPage(page);
          console.log(page);
        }}
      >
        {page}
      </li>
    );
  });

  return (
    <main>
      <h1>게시판이요</h1>
      <div>
        {process.env.REACT_APP_API_SERVER_URL}
        <ul>{posts}</ul>
      </div>
      <ul>{pageButtons}</ul>
    </main>
  );
}
