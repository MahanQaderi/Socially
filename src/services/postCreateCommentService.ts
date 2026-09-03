import api from "./axiosConfig";

export type createCommentType = {
    id : string,
    content: string
}


export const createNewCommment = async ({ id, content }:createCommentType) => {
  const res = await api.post(`/posts/${id}/comment` , { content });  
  return res.data;
};