import api from "./axiosConfig";

export const searchUsers = async (q: string) => {
  const res = await api.get(`/users/search?q=${q}`);
  return res.data;
};
