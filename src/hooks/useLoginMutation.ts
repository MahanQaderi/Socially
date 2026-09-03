import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "../services/authServices";
import { useAuthStore } from "../store/authStore";

export const useLoginMutation = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {      
      const userData = response.data.user;
      
      setUser(userData);

      queryClient.setQueryData(["session"], {
        data: {
          user: userData
        }
      });
    },
  });
};