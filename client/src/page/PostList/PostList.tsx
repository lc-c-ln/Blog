import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../component/PostList/SearchBar";
import PageButtons from "../../component/PostList/PageButtons";
import styles from "./postList.module.css";

export default function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [postList, setPostList] = useState([]);
  const [totalPostCnt, setTotalPostCnt] = useState(0);
  const [totalCommentCnt, setCommentCnt] = useState(0);
  const [category, setCategory] = useState("title");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/search`, {
        params: {
          page: currentPage,
          keyword: keyword,
          category: category,
        },
      })
      .then((res) => {
        setTotalPageNum(res.data.totalPageCnt);
        setPostList(res.data.posts);
      });
  }, [category, currentPage, keyword]);

  useEffect(() => {
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/postlist`)
      .then((res) => {
        setTotalPostCnt(res.data.postCnt);
        setCommentCnt(res.data.commentCnt);
      });
  }, []);
  var today = new Date();
  today.setDate(today.getDate() - 3);

  // view_cnt api
  const updateViewCnt = (post_id:number) => {
    axios.put(`//${process.env.REACT_APP_API_SERVER_URL}/counter/view`,{
      id:post_id
    })
  }

  const posts = postList.map((post) => {
    var createdTime = new Date(post["reg_date"]);
    return (
      <li key={post["id"]}>
        <div className={styles.frontSection}>
          <Link to={"/post/" + post["id"]} onClick={()=>updateViewCnt(post["id"])}>{post["title"]}</Link>{" "}
          {today > createdTime ? "" : "New"}
          <p className={styles.writer}> 작성자: {post["writer"]}</p>
          <p>작성일시: {post["reg_date"]}</p>
        </div>
        <div>
          <p>댓글 수: {post["comment_cnt"]}</p>
          <p>조회 수: {post["view_cnt"]}</p>
          <p>좋아요 수: {post["like_cnt"]}</p>
        </div>
      </li>
    );
  });

  return (
    <main className={styles.Home}>
      <h1>게시판</h1>총 게시물 수 : {totalPostCnt} 총 댓글 수:
      {totalCommentCnt}
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        category={category}
        setCategory={setCategory}
        postList={postList}
        totalPageNum={totalPageNum}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setTotalPageNum={setTotalPageNum}
        setPostList={setPostList}
      />
      <Link to="/post/new">새 글 쓰기</Link>
      <div>
        <ul className={styles.Post}>{posts}</ul>
      </div>
      <PageButtons
        currentPage={currentPage}
        totalPageNum={totalPageNum}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
