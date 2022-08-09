import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../component/PostList/SearchBar";

export default function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/postlist`, {
        params: {
          page: currentPage,
        },
      })
      .then((res) => {
        setTotalPageNum(Math.floor((res.data.cnt[0].cnt - 1) / 10) + 1);
        setPostList(res.data.page);
      });
  }, [currentPage]);

  const posts = postList.map((post) => {
    return (
      <li key={post["id"]}>
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
    const page = Math.floor(currentPage / 10) * 10 + idx + 1;
    return (
      <li
        key={page}
        style={{
          fontWeight: page === currentPage ? "bolder" : "",
          display: `${page <= totalPageNum ? "inline-block" : "none"}`,
        }}
        onClick={() => {
          setCurrentPage(page);
        }}
      >
        {page}
      </li>
    );
  });

  return (
    <main>
      <h1>게시판이요</h1>
      <SearchBar 
        postList={postList}
        totalPageNum={totalPageNum}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setTotalPageNum={setTotalPageNum}
        setPostList={setPostList}
      />
      <Link to="/post/new">새 글 쓰기</Link>
      <div>
        <ul>{posts}</ul>
        {currentPage}
      </div>
      <ul>
        <li
          onClick={() => {
            setCurrentPage(Math.floor(currentPage / 10) * 10 - 1);
          }}
          style={{ display: currentPage > 10 ? "inline-block" : "none" }}
        >
          Prev
        </li>
        {pageButtons}
        <li
          onClick={() => {
            setCurrentPage(Math.floor(currentPage / 10) * 10 + 11);
          }}
          style={{
            display:
              Math.floor(currentPage / 10) * 10 + 9 <= totalPageNum
                ? "inline-block"
                : "none",
          }}
        >
          Next
        </li>
      </ul>
    </main>
  );
}
