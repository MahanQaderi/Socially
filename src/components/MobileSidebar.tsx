import { Bell, BookPlus, House, LogIn, LogOut, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { SpinnerXs } from "./Ui/Spinner";
import { logoutRequest } from "../services/authServices";
import { NavLink, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { splitUsername } from "../utils/splitUsername";
import { useGetAllNotifications } from "../hooks/useGetAllNotification";
import type { NotificationTypes } from "../types/NotificationTypes";

interface sidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileSidebar(props: sidebarProps) {
  const { isOpen, setIsOpen } = props;

  const { isAuthenticated, user } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: notifications = [] } = useGetAllNotifications();

  const unreadCount = notifications.filter(
    (notification: NotificationTypes) => !notification.read,
  ).length;

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { logout: logoutStore } = useAuthStore();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logoutRequest();
      logoutStore();
      queryClient.clear();
      setIsOpen(false);
      navigate("/login");
      toast.success("Logout successfully");
    } catch (err) {
      toast.error("logout failed...");
      console.error(err);
      setIsLoggingOut(false);
    }
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `w-3/4 h-9 flex items-center justify-center gap-2 cursor-pointer rounded-md px-3 py-2 transition-all duration-200 ${
      isActive
        ? "bg-[#E5E5E5] font-medium dark:bg-[#262626]"
        : "hover:bg-[#eeeeee] hover:scale-105 dark:bg-[#1F1F1F] dark:hover:bg-[#262626]"
    }`;

  return (
    <>
      <div
        onClick={handleCloseSidebar}
        className={`md:hidden fixed inset-0 z-99 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`h-screen md:hidden z-100 fixed top-0 bottom-0 right-0 w-2xs bg-white dark:bg-[#141414] p-5 shadow-2xl duration-300 ease-out  ${isOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="font-semibold text-[16px] dark:text-white">Menu</p>

          <X
            size={16}
            className="dark:text-white cursor-pointer transition-colors duration-200"
            onClick={handleToggleSidebar}
          />
        </div>

        <div className=" w-full flex flex-col items-center justify-center bg-white dark:bg-transparent">
          {isAuthenticated ? (
            <div className=" w-full flex flex-col items-center justify-around gap-10 h-9 bg-transparent dark:bg-transparent">
              <NavLink to={"/"} end onClick={handleCloseSidebar} className={linkClass}>
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Home
                </p>
                <House size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>

              <NavLink
                to={"/notifications"}
                onClick={handleCloseSidebar}
                className={linkClass}
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Notification
                </p>
                <span className="relative flex">
                  <Bell size={16} className="dark:text-[#FAFAFA]" />

                  {unreadCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3B82F6] px-1 text-[10px] font-semibold text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </span>
              </NavLink>

              <NavLink
                to={`/profile/${splitUsername(user?.email)}`}
                onClick={handleCloseSidebar}
                className={linkClass}
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Profile
                </p>
                <UsersRound
                  size={16}
                  strokeWidth={1.75}
                  className="dark:text-[#FAFAFA]"
                />
              </NavLink>

              <div
                onClick={handleLogout}
                className="w-full h-9 items-center justify-center gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md py-2 transition-colors duration-200 dark:hover:bg-[#262626] flex"
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Logout
                </p>
                {isLoggingOut ? (
                  <SpinnerXs className="text-[#171717] dark:text-[#FAFAFA]" />
                ) : (
                  <LogOut size={16} className="dark:text-[#FAFAFA]" />
                )}
              </div>
            </div>
          ) : (
            <div className=" w-full flex flex-col items-center justify-around gap-5 pt-3 h-9 bg-transparent dark:bg-transparent">
              <NavLink to={"/"} end onClick={handleCloseSidebar} className={linkClass}>
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Home
                </p>
                <House size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>

              <NavLink
                to={"/login"}
                onClick={handleCloseSidebar}
                className={linkClass}
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Sign In
                </p>
                <LogIn size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>

              <NavLink
                to={"/register"}
                onClick={handleCloseSidebar}
                className={linkClass}
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Sign Up
                </p>
                <BookPlus size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>



            </div>
          )}
        </div>
      </div>
    </>
  );
}
