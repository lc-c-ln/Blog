import axios from "axios";

const SERVER_URL = `//${process.env.REACT_APP_API_SERVER_URL}`;

// Comment API
export const getComments = (postId: number) => {
  return axios.get(`//${process.env.REACT_APP_API_SERVER_URL}/comment`, {
    params: {
      post_id: postId,
      page: 1,
    },
  });
};

export const deleteComment = (comment_id: number, password: string) => {
  const isPasswordCorrect = checkPassword(comment_id, password);
  isPasswordCorrect.then((res) => {
    if (res) {
      axios
        .delete(`${SERVER_URL}/comment`, {
          data: { id: comment_id },
        })
        .then((res) => {
          return alert("삭제되었습니다.");
        });
    } else {
      return alert("잘못된 비밀번호입니다.");
    }
  });
};

export const checkPassword = async (comment_id: number, password: string) => {
  return axios
    .get(`${SERVER_URL}/auth/comment`, {
      params: {
        id: comment_id,
        password: password,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    });
};
