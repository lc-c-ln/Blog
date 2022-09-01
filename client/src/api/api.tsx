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

/*
Post API



*/
export const updateLikeCount = async (post_id:number, count:number) => {
  return await axios.put(`${SERVER_URL}/post/like`, {
    id: post_id,
    count: count
  })
}

export const updateViewCount = async ( post_id:number ) => {
  return await axios.put(`${SERVER_URL}/post/view`, {
      id: post_id
  }).then(res => {return res}).catch(err => {return err})
}

export const searchPosts = async (page : number, keyword :string, category: string) =>{
  return await axios
  .get(`//${process.env.REACT_APP_API_SERVER_URL}/search`, {
    params: {
      page: page,
      keyword: keyword,
      category: category,
    },
  })
}