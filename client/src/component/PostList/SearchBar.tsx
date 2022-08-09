import axios from "axios";
import React, { useRef, useState } from "react";

interface searchBarProps {
  postList: never[];
  totalPageNum: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setPostList: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function SearchBar(props: searchBarProps) {
  const keywordRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/search`, {
        params: {
          page: 1,
          keyword: keywordRef.current ? keywordRef.current.value : "",
          category: categoryRef.current
            ? categoryRef.current.selectedOptions[0].value
            : "",
        },
      })
      .then((res) => {
        props.setTotalPageNum(res.data.cnt);

        // setCurrentPage(1);
        console.log(res.data);
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
