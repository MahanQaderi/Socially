import type { NotificationTypes } from "../../types/NotificationTypes";
import Avatar from "../Ui/Avatar";
import NotificationContent from "./NotificationContent";
import { SpinnerXs } from "../Ui/Spinner";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { useMarkOneNotificationAsRead } from "../../hooks/useMarkOneNotificationAsRead";

const NotificationCard = (notification: NotificationTypes) => {
  const cardTheme = notification.read
    ? "border-[#E5E5E5] bg-white dark:border-[#262626] dark:bg-[#1C1C1C]"
    : "cursor-pointer border-[#3B82F6]/30 bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10 dark:bg-[#3B82F6]/10 dark:hover:bg-[#3B82F6]/15";

  const { mutate: readOneNotification, isPending: isReading } =
    useMarkOneNotificationAsRead();

  const pendingTheme = isReading ? "opacity-60" : "";

  const handleReadOneNotification = () => {
    if (notification.read || isReading) {
      return;
    }
    readOneNotification({ ids: [notification.id] });
  };

  return (
    <li
      role={notification.read ? undefined : "button"}
      tabIndex={notification.read ? undefined : 0}
      aria-label={notification.read ? undefined : "Mark this notification as read"}
      className={`relative flex gap-3 rounded-xl border p-4 transition-all duration-200 ${notification.read ? "" : "hover:-translate-y-0.5"} ${cardTheme} ${pendingTheme}`}
      onClick={handleReadOneNotification}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleReadOneNotification();
        }
      }}
    >
      <Avatar
        src={notification.creator.image}
        width={40}
        height={40}
        alt={`${notification.creator.name} avatar`}
      />

      <div className="min-w-0 flex-1">
        <NotificationContent {...notification} />

        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {getTimeAgo(notification.createdAt)}
        </p>
      </div>

      {isReading ? (
        <SpinnerXs className="absolute right-4 top-4 text-blue-500" />
      ) : (
        !notification.read && (
          <span className="absolute right-4 top-4 h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
        )
      )}
    </li>
  );
};

export default NotificationCard;
