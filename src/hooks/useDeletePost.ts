import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../services/DeleteUsersPostService";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

type ErrorResponse = {
  message: string;
};

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["get-users-posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["allPosts"],
      });
      toast.success(res.message || "post deleted successfully");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}