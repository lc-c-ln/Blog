import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../../component/Home/SearchBar";
import PageButtons from "../../component/Home/PageButtons";
import styles from "./homePage.module.css";
import { searchPosts } from "../../api/api";
import PostList from "../../component/Home/PostList";

export default function HomePage() {
  // best는 redux로 검색category, keyword 관리하는 것 
  const { state } = useLocation();

  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  
  const [totalCouter, setTotalCouter] = useState([0, 0]);

  const [searchKeyword, setSearchKeyword] = useState({
    category: state  ? (state as any).category: "title",
    keyword: state  ? (state as any).keyword: "",
  });
  
  useEffect(() => {
    searchPosts(
      currentPage,
      searchKeyword.keyword,
      searchKeyword.category
    ).then((res) => {
      setTotalPageNum(res.data.totalPageCnt);
      setPostList(res.data.posts);
      // To clear locate.state 
      window.history.replaceState({}, document.title)
    });
  }, [currentPage, searchKeyword]);

  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/counter`)
      .then((res) => {
        setTotalCouter([res.data.postCnt, res.data.commentCnt]);
      });
  }, []);

  return (
    <main className={styles.Home}>
      <h1>게시판</h1>
      <div>
        <p>총 게시물 수 : {totalCouter[0]} </p>
        <p>
          총 댓글 수:
          {totalCouter[1]}
        </p>
      </div>
      <SearchBar
        setCurrentPage={setCurrentPage}
        setSearchKeyword={setSearchKeyword}
        location={state}
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
