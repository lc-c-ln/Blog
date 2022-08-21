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

export const createComment = async (postId:number, content:string, parent_comment_id:number | null, writer:string, password:string) =>{
  return await axios
  .post(`//${process.env.REACT_APP_API_SERVER_URL}/comment`, {
    post_id: postId,
    parent_comment_id: parent_comment_id,
    content: content,
    writer: writer,
    password: password,
  })
}

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


// Post API
export const updateLikeCount = (post_id:number, count:number) => {
  return axios.put(`${SERVER_URL}/post/like`, {
    id: post_id,
    count: count
  })
}

// User 인증 끼게 되면 한 유저 당 한번만 가능하게 해야 한다.
// LikedPost Table에 post_id 저장하고, Update 전에 user_id에 post_id 확인
export const updateViewCount = async ( post_id:number ) => {
  return await axios.put(`${SERVER_URL}/post/view`, {
      id: post_id
  }).then(res => {return res}).catch(err => {return err})
}

