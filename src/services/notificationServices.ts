import api from "./axiosConfig";

type MarkNotificationsAsReadPayload = {
    ids : string[];
}

export const markNotificationsAsRead = async (payload : MarkNotificationsAsReadPayload) => {
  const res = await api.patch("/notifications" , payload);  
  return res.data;
};


export const getAllNotifications = async () => {
  const res = await api.get("/notifications");

  // the api can answer 200 without any data when it fails, so it is turned into a real error here
  if (!res.data?.success) {
    throw new Error(res.data?.message || "Failed to fetch notifications");
  }

  return res.data.data ?? [];
};
