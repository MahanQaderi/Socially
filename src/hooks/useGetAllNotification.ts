import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../services/notificationServices";
import { useAuthStore } from "../store/authStore";

export const useGetAllNotifications = () => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ["allNotifications", user?.id],
    queryFn: getAllNotifications,
    enabled: !!user?.id,
    refetchOnWindowFocus: "always",
    staleTime: 1000 * 60 * 5,
    refetchOnMount: "always",
  });

  return query;
};
