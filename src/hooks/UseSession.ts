import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getSession } from "../services/SessionServices";

export const useSession = () => {
  const { setUser, setSession, logout } = useAuthStore();

  const query = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.data?.user) {
      setUser(query.data.data.user);
      setSession(query.data.data.session);
    } 
    else if (query.isError) {
      const status = (query.error as AxiosError)?.response?.status;

      // the api answers 404 when there is no session and 401 when it is rejected
      if (status === 401 || status === 404) {
        logout();
      }
    }
  }, [query.isSuccess, query.isError, query.data, query.error, setUser, setSession, logout]);

  return query;
};
