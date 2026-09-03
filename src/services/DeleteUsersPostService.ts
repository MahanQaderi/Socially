import api from "./axiosConfig";

export const deletePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}`);

  return response.data;
};
