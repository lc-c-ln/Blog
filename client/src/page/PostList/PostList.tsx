import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../component/PostList/SearchBar";
import PageButtons from "../../component/PostList/PageButtons";
export default function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [postList, setPostList] = useState([]);
  // search event가 없는 상태면 그... params에 defaultPage : true 넣어서, true면 
  // 상황 1. 최초 렌더링 : keyword 없는 상태로 요청 보내서 받아 오기.
  // 상황 2. 검색 하지 않고, 페이지 이동하기. 
  // keyword 없이 page=2로 요청 보내기
  // 상황 3. 검색하기.( page=1 )
  // 요청에는 keyword, category 달아주고, totalPage랑, postList 보내기
  
  // 상황 4. 검색한 상태로 페이지 바꾸기
  // 요청에 keyword, category 직전에 했던대로 하고, totalPage랑 postList 보내기
  // 검색 창에 있는 데이터가 바뀌어도, 보내기 누른거 아니면, state 변경하지 않아야 함.=> 왜? 그럼, 페이지 이동할 때, 변경된 값으로 검색될수도 있기 때문
  
  useEffect(() => {
    // 
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/search`, {
        params: {
          page: currentPage,
        },
      })
      .then((res) => {
        setTotalPageNum(Math.floor((res.data.cnt - 1) / 10) + 1);
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

  return (
    <main>
      <h1>게시판이요</h1>
      <SearchBar />
      <Link to="/post/new">새 글 쓰기</Link>
      <div>
        <ul>{posts}</ul>
      </div>
        <PageButtons currentPage={currentPage} totalPageNum={totalPageNum} setCurrentPage={setCurrentPage}/>
    </main>
  );
}
