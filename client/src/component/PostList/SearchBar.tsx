import axios from "axios";
import React, { useState } from "react";

export default function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useState({
    category: "title",
    keyword: "",
  });
  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.tagName)
    if (e.target.tagName === "SELECT") {
      setSearchKeyword({
        ...searchKeyword,
        category: e.target.value,
      });
    } else {
      setSearchKeyword({
        ...searchKeyword,
        keyword: e.target.value,
      });
    }
  };
  
  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get(`//${process.env.REACT_APP_API_SERVER_URL}/search`, {
        params: {
          ...searchKeyword,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <form onChange={onChangeSearchKeyword} onSubmit={searchHandler}>
        <select name="category" required>
          <option defaultChecked value="title">
            제목
          </option>
          <option value="writer">작성자</option>
          <option value="content">내용</option>
          <option value="hashtag">태그</option>
        </select>
        <input
          required
          type="text"
          placeholder="키워드를 입력하세요."
        />
      </form>
    </div>
  );
}
