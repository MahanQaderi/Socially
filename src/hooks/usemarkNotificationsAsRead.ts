import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationsAsRead } from "../services/notificationServices";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  const {user} = useAuthStore()

  const query = useMutation({
    mutationFn: markNotificationsAsRead,

    onSuccess: (res) => {

      queryClient.invalidateQueries({ queryKey: ["allNotifications" , user?.id] });
      toast.success(res.message);
    },
    onError: (res) => {
      toast.error(res.message || "Something went wrong");
    },

    retry: false,
  });

  return query;
};
