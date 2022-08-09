import React from "react";

interface props {
  currentPage: number;
  totalPageNum: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageButtons({
  currentPage,
  totalPageNum,
  setCurrentPage,
}: props) {
  const pageButtons = [...Array(10)].map((num, idx) => {
    const page = Math.floor(currentPage / 10) * 10 + idx + 1;
    return (
      <li
        key={page}
        style={{
          fontWeight: page === currentPage ? "bolder" : "",
          display: `${page <= totalPageNum ? "inline-block" : "none"}`,
        }}
        onClick={() => {
          setCurrentPage(page);
        }}
      >
        {page}
      </li>
    );
  });

  return (
    <ul>
      <li
        onClick={() => {
          setCurrentPage(Math.floor(currentPage / 10) * 10 - 1);
        }}
        style={{ display: currentPage > 10 ? "inline-block" : "none" }}
      >
        Prev
      </li>
      {pageButtons}
      <li
        onClick={() => {
          setCurrentPage(Math.floor(currentPage / 10) * 10 + 11);
        }}
        style={{
          display:
            Math.floor(currentPage / 10) * 10 + 9 <= totalPageNum
              ? "inline-block"
              : "none",
        }}
      >
        Next
      </li>
    </ul>
  );
}
