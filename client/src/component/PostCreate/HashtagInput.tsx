import React, { FormEvent, useState } from "react";

interface hashtagProps {
  hashtag: string;
  onRemoveHashtag: (hashtag: string) => void;
}

const Hashtag = ({ hashtag, onRemoveHashtag }: hashtagProps) => {
  return <li onClick={() => onRemoveHashtag(hashtag)}> {hashtag} X</li>;
};

interface props {
  hashtagList: string[];
  setHashtagList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function HashtagInput({ hashtagList, setHashtagList }: props) {
  const [hashtagInput, setHashtagInput] = useState("");

  const onAddHashtag = (e: React.FormEvent) => {
    e.preventDefault();
    if (hashtagList.includes(hashtagInput)) {
        alert("이미 등록된 태그입니다.")
    } else {
        setHashtagList([...hashtagList, hashtagInput]);
    }
  };

  const onRemoveHashtag = (hashtag: string) => {
    setHashtagList(hashtagList.filter((tagname) => tagname !== hashtag));
  };

  const hashtags = hashtagList.map((hashtag) => {
    return <Hashtag hashtag={hashtag} onRemoveHashtag={onRemoveHashtag} />;
  });

  const onChange = (e:FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const regex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/g
    if (regex.test(value)) {
        alert("태그에는 특수문자의 입력이 불가능합니다.");
    } else{
        setHashtagInput(value)
    }
  }

  return (
    <div>
      <ul>{hashtags}</ul>
      {(hashtagList.length < 5) ? 
      <form onSubmit={onAddHashtag}>
        <input type="text" placeholder="#해시태그 #최대5개" onChange={onChange} value={hashtagInput}></input>
      </form>
      :
      <div>태그는 최대 5개까지 할 수 있습니다.</div>
      }
    </div>
  );
}
