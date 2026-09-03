import { Outlet, useLocation, Navigate } from "react-router";
import Header from "../components/Header";
import SideSignIn from "../components/SideSignIn";
import SideRecommendedUsers from "../components/SideRecommendedUsers";
import SideProfile from "../components/SideProfile";
import { useSession } from "../hooks/UseSession";
import { Spinner } from "../components/Ui/Spinner";

export default function RootLayout() {
  const location = useLocation();
  
  const { data, isLoading } = useSession();
  
  const isAuthenticated = !!data?.data?.user;

  const isHomePage = location.pathname === "/";
  
  const isProtectedRoute = location.pathname === "/notifications";

  if (isProtectedRoute && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F6F8] dark:bg-[#0A0A0A]">
        <div className="text-center animate-fade-in">
          <Spinner />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (isProtectedRoute && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F6F8] dark:bg-[#0A0A0A]">
      <header className="sticky top-0 z-50">
        <Header isSessionLoading={isLoading} />
      </header>
      
      {/* the sides keep a fixed width so the feed stays the same size signed in or out */}
      <div className="flex justify-center mx-auto w-[92%] max-w-320 mt-8 gap-5 md:gap-6">
        <aside className={`${!isLoading && !isAuthenticated ? "hidden md:block" : "hidden"} w-64 shrink-0 animate-fade-up`}>
          <SideSignIn />
        </aside>

        <aside className={`${!isLoading && isAuthenticated ? "hidden md:block" : "hidden"} w-64 shrink-0 animate-fade-up`}>
          <SideProfile />
        </aside>

        <main key={location.pathname} className="w-full max-w-150 min-w-0 flex-1 animate-fade-up">
          <Outlet />
        </main>

        <aside className={`${!isLoading && isAuthenticated && isHomePage ? "hidden lg:block" : "hidden"} w-64 shrink-0 animate-fade-up`}>
          <SideRecommendedUsers />
        </aside>
      </div>
    </div>
  );
}
