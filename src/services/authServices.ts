import api from "./axiosConfig";

interface LoginData {
    email: string
    password: string
}

interface RegisterData {
    name: string
    email: string
    password: string
}

export const loginRequest = async (data: LoginData) => {
    const res = await api.post("/authentication/login", data);

    return res.data;
};

export const registerRequest = async (data: RegisterData) => {
    const res = await api.post("/authentication/register", data);

    return res.data;
};

export const logoutRequest = async () => {
  return await api.post('/authentication/logout');
};
