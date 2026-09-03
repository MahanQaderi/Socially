import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../types/ErrorResponseType";
import { deleteComment, type DeleteCommentParams } from "../services/deleteUsersCommentService";

export const useDeleteComment = () => {
    
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (param: DeleteCommentParams) => deleteComment(param),
    onSuccess: () => {
        toast.success("Comment deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
        queryClient.invalidateQueries({ queryKey: ["get-users-posts"] });
        queryClient.invalidateQueries({ queryKey: ["get-users-liked-posts"] });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to delete the comment");
    },

  });
};
