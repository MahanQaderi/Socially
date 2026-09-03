import api from "./axiosConfig";

export interface GetUserInformationData {
  username: string | undefined;
}

export const getUserByUserName = async (data: GetUserInformationData) => {
  const response = await api.get(`/users/${data.username}/profile`);

  return response.data;
};

export interface GetUserInformationByIdData {
    id: string
}

export const getUserById = async (data: GetUserInformationByIdData) => {
    const response = await api.get(`/users/${data.id}/profile`);
    
    return response.data;
};
