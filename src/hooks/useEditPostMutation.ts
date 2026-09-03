import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  editPostRequest,
  type EditPostPayloadType,
} from "../services/editPostService";

type EditPostMutationData = {
  postId: string;
  payload: EditPostPayloadType;
};

export const useEditPost = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, payload }: EditPostMutationData) =>
      editPostRequest({
        postId,
        payload: {
          image: payload.image,
          content: payload.content,
        },
      }),
       onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allPosts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-users-posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-users-liked-posts"],
      });
    },
  });
};
