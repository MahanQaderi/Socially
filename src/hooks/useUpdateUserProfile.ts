import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../types/ErrorResponseType";

import {
  updateUserById,
  type UserId,
} from "../services/updateUserProfileServices";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserId) => updateUserById(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-by-userName"],
      });

      queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
