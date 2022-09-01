import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../component/Home/SearchBar";
import PageButtons from "../../component/Home/PageButtons";
import styles from "./homePage.module.css";
import { searchPosts } from "../../api/api";
import PostList from "../../component/Home/PostList";

export default function HomePage() {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);

  const [totalPostCnt, setTotalPostCnt] = useState(0);
  const [totalCommentCnt, setCommentCnt] = useState(0);

  const [searchKeyword, setSearchKeyword] = useState({
    category: "title",
    keyword: "",
  });

  useEffect(() => {
    searchPosts(
      currentPage,
      searchKeyword.keyword,
      searchKeyword.category
    ).then((res) => {
      setTotalPageNum(res.data.totalPageCnt);
      setPostList(res.data.posts);
    });
  }, [currentPage, searchKeyword]);

  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/counter`)
      .then((res) => {
        setTotalPostCnt(res.data.postCnt);
        setCommentCnt(res.data.commentCnt);
      });
  }, []);

  return (
    <main className={styles.Home}>
      <h1>게시판</h1>
      <div>
        <p>총 게시물 수 : {totalPostCnt} </p>
        <p>
          총 댓글 수:
          {totalCommentCnt}
        </p>
      </div>
      <SearchBar
        setCurrentPage={setCurrentPage}
        setSearchKeyword={setSearchKeyword}
      />
      <Link to="/post/new">새 글 쓰기</Link>
      <PostList postList={postList} />
      <PageButtons
        currentPage={currentPage}
        totalPageNum={totalPageNum}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
