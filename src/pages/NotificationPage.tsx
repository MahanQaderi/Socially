import { SpinnerMini, SpinnerXs } from "../components/Ui/Spinner";
import NotificationCard from "../components/notification/NotificationCard";
import { useGetAllNotifications } from "../hooks/useGetAllNotification";
import { useMarkNotificationsAsRead } from "../hooks/usemarkNotificationsAsRead";
import type { NotificationTypes } from "../types/NotificationTypes";

export default function NotificationPage() {


  const { data: notifications = [], isLoading: isLoadingNotifications, isError} =
    useGetAllNotifications();

  const { mutate: readAllNotification, isPending: isMarkingAsRead } =
    useMarkNotificationsAsRead();

  const unreadCount = notifications.filter(
    (notification: NotificationTypes) => !notification.read,
  ).length;

  const handleReadAllNotification = () => {
    if (unreadCount === 0) return;

    const ids = notifications
      .filter((notification: NotificationTypes) => !notification.read)
      .map((notification: NotificationTypes) => notification.id);

    readAllNotification({ ids });
  };

  const unreadCountTheme =
    unreadCount === 0
      ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
      : "bg-transparent text-gray-900 hover:bg-blue-50 hover:text-blue-500 dark:text-white dark:hover:bg-blue-950";

  return (
    <div className="mx-auto flex w-full flex-col rounded-2xl border border-[#E5E5E5] bg-white shadow-card animate-fade-up dark:border-[#262626] dark:bg-[#141414]">
      <div className="flex items-center justify-between gap-4 border-b border-[#F0F0F0] px-5 py-5 sm:px-6 dark:border-[#1F1F1F]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Notifications
        </h3>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {unreadCount} unread
          </span>

          <button
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-200 ${unreadCountTheme} disabled:opacity-70`}
            onClick={handleReadAllNotification}
            disabled={unreadCount === 0 || isMarkingAsRead}
          >
            {isMarkingAsRead ? (
              <>
                <SpinnerXs />
                Marking...
              </>
            ) : (
              "Mark all as read"
            )}
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-3 p-5 sm:p-6 m-0 list-none stagger">
        {isLoadingNotifications ? (
          <li className="flex h-40 items-center justify-center">
            <SpinnerMini className="text-gray-400" />
          </li>
        ) : isError ? (
          <li className="flex h-40 items-center justify-center text-red-500">
            Failed to load notifications
          </li>
        ) : notifications.length === 0 ? (
          <li className="flex h-40 items-center justify-center text-gray-500">
            No notifications yet
          </li>
        ) : (
          notifications.map((notification:NotificationTypes) => (
            <NotificationCard key={notification.id} {...notification} />
          ))
        )}
      </ul>
    </div>
  );
}
