import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { searchPosts } from "../../api/api";
// import {searchPosts} from

interface props {
  postList: never[];
  totalPageNum: number;
  currentPage: number;
  category: string;
  keyword: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setPostList: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function SearchBar(props: props) {
  const keywordRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  // 원래 로직
  //
  // searchbar 컴포넌트에서는 Category/keyword와 같은 값만 변화시키고, 실제로 검색은 PostList에서 일어나게 구현함.
  // serach bar 컴포넌트에서 search 관련된 기능이 모두 실현되고,
  // postList에서는 그 결과물을 보여주는 역할만 하도록 refactoring
  // 1. useEffect를 사용하지 말고,
  //  searchEvent 실행 시, setState로 postlist를 변화시켜 줌으로써, Rerendering 일어나도록

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    searchPosts(
      props.currentPage,
      keywordRef.current ? keywordRef.current.value : "",
      categoryRef.current ? categoryRef.current.selectedOptions[0].value : ""
    ).then((res) => {
      props.setTotalPageNum(res.data.totalPageCnt);
      props.setPostList(res.data.posts);
      props.setCurrentPage(1)
    });
  };

  return (
    <div>
      <form onSubmit={searchHandler}>
        <select name="category" required ref={categoryRef}>
          <option defaultChecked value="title">
            제목
          </option>
          <option value="writer">작성자</option>
          <option value="content">내용</option>
          <option value="hashtag">태그</option>
        </select>
        <input
          ref={keywordRef}
          type="text"
          placeholder="키워드를 입력하세요."
        />
      </form>
    </div>
  );
}
