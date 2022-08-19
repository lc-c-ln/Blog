import axios from "axios";

const SERVER_URL = `//${process.env.REACT_APP_API_SERVER_URL}`;

// Comment API
export const getComments = (postId: number) => {
  return axios.get(`${SERVER_URL}/comment`, {
    params: {
      post_id: postId,
      page: 1,
    },
  });
};

export const deleteComment = async (comment_id: number, password: string) => {
  const isPasswordCorrect = await checkPassword(comment_id, password);
  if (isPasswordCorrect === 200) {
    return await axios
      .delete(`${SERVER_URL}/comment`, {
        data: { id: comment_id },
      })
      .then((res) => {
        return res.status;
      });
  } else {
    return 401; // http Status 401
  }
};

export const checkPassword = async (comment_id: number, password: string) => {
  const response = await axios
    .get(`${SERVER_URL}/auth/comment`, {
      params: {
        id: comment_id,
        password: password,
      },
    })
    .then((res) => {
      return 200;
    })
    .catch((err) => {
      return err.status;
    });
  return response;
};
