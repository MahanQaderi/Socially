import api from "./axiosConfig";

export type updateCommentType = {
  postId: string;
  commentId: string;
  content: string;
};

export const updateCommentService = async ({ postId, commentId, content }: updateCommentType) => {
  const res = await api.put(`/posts/${postId}/comment/${commentId}`, { content });  
  return res.data;
};