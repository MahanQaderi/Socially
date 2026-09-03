import api from "./axiosConfig";

export const getRecommendedUsers = async () => {
  const res = await api.get("/users/recommend");  
  return res.data;
};