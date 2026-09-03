import api from "./axiosConfig";

export const toggleFollowUserRequest = async (id : string) => {
  const res = await api.patch(`/users/${id}`);  
  return res.data;
};
