import React, { useRef } from "react";

interface props {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchKeyword: React.Dispatch<
    React.SetStateAction<{
      category: string;
      keyword: string;
    }>
  >;
}

export default function SearchBar(props: props) {
  // ref.current 마다 null 처리 하는 문제 때문에 any 사용
  const keywordRef = useRef<any>();
  const categoryRef = useRef<any>();

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    props.setSearchKeyword({
      keyword: keywordRef.current.value,
      category: categoryRef.current.value,
    });
    props.setCurrentPage(1)
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
