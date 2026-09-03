import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewPostRequest, type createPostPayloadType } from "../services/postServices"
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

type ErrorResponse = {
  message: string;
};

export const useAddNewPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: createPostPayloadType) => createNewPostRequest(content),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allPosts"],
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};