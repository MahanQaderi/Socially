import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../types/ErrorResponseType";
import { updateCommentService, type updateCommentType } from "../services/updateCommentService";

export const useUpdateComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: updateCommentType) => updateCommentService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allPosts"] });
            queryClient.invalidateQueries({ queryKey: ["get-users-posts"] });
            queryClient.invalidateQueries({ queryKey: ["get-users-liked-posts"] });
        },
        onError:(error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data?.message || "Failed to update the comment")
        },
    });

};
