import {Bell,House,LogOut,Menu,Moon,Sun,UsersRound} from "lucide-react";
import { SpinnerXs } from "./Ui/Spinner";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../services/authServices";
import { splitUsername } from "../utils/splitUsername";
import { useTheme } from "../hooks/useTheme";
import UserSearch from "./Ui/UserSearch";
import { useGetAllNotifications } from "../hooks/useGetAllNotification";
import type { NotificationTypes } from "../types/NotificationTypes";

type HeaderProps = {
  isSessionLoading?: boolean;
};

export default function Header({ isSessionLoading }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  const { logout: logoutStore, isAuthenticated, user } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { data: notifications = [] } = useGetAllNotifications();

  const unreadCount = notifications.filter(
    (notification: NotificationTypes) => !notification.read,
  ).length;

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logoutRequest();
      logoutStore();
      queryClient.clear();
      toast.success("Logout successfully");
      navigate("/login");
    } catch (err) {
      toast.error("logout failed...");
      console.error(err);
      setIsLoggingOut(false);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `h-9 flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 transition-all duration-200 ${
      isActive
        ? "bg-[#EDEDED] font-medium dark:bg-[#262626]"
        : "hover:bg-[#eeeeee] hover:-translate-y-0.5 dark:hover:bg-[#262626]"
    }`;

  return (
    <>
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen}></MobileSidebar>

      <div className="w-full h-16 border-b border-[#E5E5E5]/60 bg-white/70 backdrop-blur-xl transition-colors duration-300 dark:border-[#262626]/60 dark:bg-black/60">
        <div className="flex justify-between w-[90%] md:w-[85%] mx-auto items-center h-full gap-2">
          <div className="flex min-w-0 flex-1 justify-start">
            <NavLink
              to={"/"}
              className="shrink-0 text-[#171717] text-[20px] font-bold transition-opacity duration-200 hover:opacity-70 dark:text-[#FAFAFA] "
            >
              Socially
            </NavLink>
          </div>

          {/* on mobile the search lives in the sidebar, otherwise it sits on top
              of the logo and the menu button */}
          {isAuthenticated && (
            <UserSearch className="mx-2 hidden w-full min-w-0 max-w-72 shrink sm:mx-4 md:block" />
          )}

          <nav className="flex min-w-0 flex-1 items-center justify-end gap-2 md:gap-5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[#eeeeee] border border-[#E5E5E5] dark:border-[#262626] rounded-md shadow shadow-[#0000001A] transition-all duration-200 hover:scale-105 dark:hover:bg-[#262626]"
            >
              <Sun size={20} className="dark:hidden transition-transform duration-500" />
              <Moon size={20} className="hidden dark:block dark:text-white transition-transform duration-500" />
            </button>

            {isSessionLoading ? (
              // nothing is shown until the session answers, otherwise the guest
              // buttons flash on every page load
              <div className="hidden h-9 md:block" />
            ) : isAuthenticated ? (
              <div className=" items-center justify-around gap-2 h-9 hidden md:flex">
                <NavLink to={"/"} end className={navLinkClass}>
                  <House size={16} className="dark:text-[#FAFAFA]" />
                  <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                    Home
                  </p>
                </NavLink>

                <NavLink to={"/notifications"} className={navLinkClass}>
                  <span className="relative flex">
                    <Bell size={16} className="dark:text-[#FAFAFA]" />

                    {unreadCount > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3B82F6] px-1 text-[10px] font-semibold text-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </span>
                  <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                    Notification
                  </p>
                </NavLink>

                <NavLink
                  to={`/profile/${splitUsername(user?.email)}`}
                  className={navLinkClass}
                >
                  <UsersRound
                    size={16}
                    strokeWidth={1.75}
                    className="dark:text-[#FAFAFA]"
                  />
                  <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                    Profile
                  </p>
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="w-9 h-9 items-center justify-center cursor-pointer hover:bg-[#eeeeee] rounded-md transition-all duration-200 hover:scale-105 dark:hover:bg-[#262626] hidden md:flex"
                >
                  {isLoggingOut ? (
                    <SpinnerXs className="text-[#171717] dark:text-[#FAFAFA]" />
                  ) : (
                    <LogOut size={16} className="dark:text-[#FAFAFA]" />
                  )}
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-between gap-4">
                <NavLink to={"/"} end className={navLinkClass}>
                  <House size={16} className="dark:text-[#FAFAFA]" />
                  <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                    Home
                  </p>
                </NavLink>

                <NavLink
                  to={"/login"}
                  className="h-9 bg-[#0A0A0A] flex items-center justify-between gap-2 cursor-pointer rounded-md px-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#404040] hover:shadow-md dark:bg-[#FAFAFA] dark:hover:bg-[#D4D4D4]"
                >
                  <p className="text-[14px] text-white dark:text-[#0A0A0A]">
                    Sign In
                  </p>
                </NavLink>
              </div>
            )}

            <button
              type="button"
              onClick={handleToggleSidebar}
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="md:hidden w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[#eeeeee] border border-[#E5E5E5] dark:border-[#262626] rounded-md shadow shadow-[#0000001A] transition-all duration-200 hover:scale-105 dark:hover:bg-[#262626] "
            >
              <Menu size={16} className="dark:text-[#FAFAFA]" />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
