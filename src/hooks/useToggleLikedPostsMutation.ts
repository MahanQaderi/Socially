import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";
import type { PostType } from "../types/AllPostsTypes";
import {
  toggleLikedPosts,
  type toggleLikedPostsType,
} from "../services/toggleLikedPostsServices";

type ErrorResponse = {
  message: string;
  success: boolean;
};

type Snapshot = [QueryKey, unknown][];

// every list that can be showing the post
const listKeys = [["allPosts"], ["get-users-posts"], ["get-users-liked-posts"]];

const togglePost = (post: PostType, postId: string, userId: string) => {
  if (post.id !== postId) return post;

  const liked = post.likes.some((like) => like.userId === userId);

  return {
    ...post,
    likes: liked
      ? post.likes.filter((like) => like.userId !== userId)
      : [...post.likes, { userId }],
    _count: {
      ...post._count,
      likes: post._count.likes + (liked ? -1 : 1),
    },
  };
};

export const useToggleLikedPostsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; success: boolean },
    AxiosError<ErrorResponse>,
    toggleLikedPostsType,
    { snapshot: Snapshot }
  >({
    mutationFn: (data) => toggleLikedPosts(data),

    // flip the heart straight away instead of waiting for the whole feed to reload
    onMutate: async ({ id }) => {
      const userId = useAuthStore.getState().user?.id;

      const snapshot: Snapshot = [];

      if (!userId) return { snapshot };

      for (const queryKey of listKeys) {
        await queryClient.cancelQueries({ queryKey });

        snapshot.push(...queryClient.getQueriesData({ queryKey }));

        queryClient.setQueriesData({ queryKey }, (old) => {
          const cached = old as { data?: unknown[] } | undefined;

          if (!Array.isArray(cached?.data)) return old;

          return {
            ...cached,
            data: cached.data.map((item) => {
              const entry = item as PostType & { post?: PostType };

              return entry.post
                ? { ...entry, post: togglePost(entry.post, id, userId) }
                : togglePost(entry, id, userId);
            }),
          };
        });
      }

      return { snapshot };
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    // put the old lists back if the api refused the like
    onError: (error, _variables, context) => {
      context?.snapshot.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      toast.error(error.response?.data?.message || "Please try again");
    },

    onSettled: () => {
      listKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
};
