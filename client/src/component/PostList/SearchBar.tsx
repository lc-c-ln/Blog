import axios from "axios";
import React, { useRef, useState } from "react";

interface props {
  postList: never[];
  totalPageNum: number;
  currentPage: number;
  category:string;
  keyword:string;
  setCategory:React.Dispatch<React.SetStateAction<string>>;
  setKeyword:React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPageNum: React.Dispatch<React.SetStateAction<number>>;
  setPostList: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function SearchBar(props: props) {
  const keywordRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    props.setKeyword(keywordRef.current ? keywordRef.current.value : "")
    props.setCategory(categoryRef.current
      ? categoryRef.current.selectedOptions[0].value
      : "")
    props.setCurrentPage(1)
    // axios
    //   .get(`//${process.env.REACT_APP_API_SERVER_URL}/search`, {
    //     params: {
    //       page: 1,
    //       keyword: keywordRef.current ? keywordRef.current.value : "",
    //       category: categoryRef.current
    //         ? categoryRef.current.selectedOptions[0].value
    //         : "",
    //     },
    //   })
    //   .then((res) => {
    //     props.setCurrentPage(1)
    //     props.setTotalPageNum(res.data.totalPageCnt);
    //     props.setPostList(res.data.posts);
    //   });
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
