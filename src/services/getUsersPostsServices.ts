import api from "./axiosConfig";

export interface GetUsersPostsData {
    id: string
}

export const getUsersPostsById = async (data: GetUsersPostsData) => {
    const response = await api.get(`/users/${data.id}/posts`);

    return response.data;
};

