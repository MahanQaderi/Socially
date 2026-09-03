import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewCommment,
  type createCommentType,
} from "../services/postCreateCommentService";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

type CommentResponse = {
  message: string;
  success: boolean;
};

export const useAddNewCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CommentResponse,
    AxiosError<CommentResponse>,
    createCommentType
  >({
    mutationFn: (commentType) => createNewCommment(commentType),

    onSuccess: async (data) => {
      toast.success(data.message);
    },

    onSettled: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      await queryClient.refetchQueries({
        queryKey: ["allPosts"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["get-users-posts"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["get-users-liked-posts"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Please try again");
    },
  });
};