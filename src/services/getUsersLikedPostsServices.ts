import api from "./axiosConfig";

export interface UserId {
  id: string;
}

export const getUsersLikedPosts = async (data: UserId) => {
  const response = await api.get(`/users/${data.id}/likes`);

  return response.data;
};