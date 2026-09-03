import api from "./axiosConfig";

export interface DeleteCommentParams {
  postId: string;
  commentId: string;
}

export const deleteComment = async ({ postId, commentId }: DeleteCommentParams) => {
  const response = await api.delete(`/posts/${postId}/comment/${commentId}`);

  return response.data;
};