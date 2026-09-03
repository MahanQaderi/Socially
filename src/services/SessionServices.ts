import api from "../services/axiosConfig";
import type { SessionResponse } from "../types/SessionTypes";

export const getSession = async () => {
  const response = await api.get<SessionResponse>("/authentication/session");

  return response.data;
};
