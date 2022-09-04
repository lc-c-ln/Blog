import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostList.module.css";
interface props {
  postList: never[];
}

export default function PostList({ postList }: props) {
  var today = new Date();
  today.setDate(today.getDate() - 3);

  const posts = postList.map((post) => {
    var createdTime = new Date(post["reg_date"]);
    return (
      <li key={post["id"]}>
        <div className={styles.Section1}>
          <Link to={"/post/" + post["id"]}>{post["title"]}</Link>{" "}
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
  return <ul className={styles.Post}>{posts}</ul>;
}
