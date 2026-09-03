import api from "./axiosConfig";

export type toggleLikedPostsType = {
  id: string;
};

export const toggleLikedPosts = async ({
  id,
}: toggleLikedPostsType) => {
  const res = await api.patch(`/posts/${id}`);

  return res.data;
};