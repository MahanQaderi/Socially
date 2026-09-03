import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerRequest } from "../services/authServices";
import { useAuthStore } from "../store/authStore";

export const useRegisterMutation = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerRequest,
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

  return mutation;
};
