import api from "./axiosConfig";

export const getFollowerList = async (id: string) => {
  const res = await api.get(`/users/${id}/followers`);
  return res.data;
};

export const getFollowingList = async (id: string) => {
  const res = await api.get(`/users/${id}/followings`);
  return res.data;
};
