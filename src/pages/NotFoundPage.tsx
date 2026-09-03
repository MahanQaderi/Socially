import { Home, SearchX } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-gray-50 to-gray-100 dark:from-black dark:to-gray-950 px-4">
      <div className="max-w-md w-full text-center animate-fade-up">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-900">
          <SearchX size={48} className="dark:text-white" />
        </div>

        <h1 className="text-7xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg dark:bg-white dark:text-black"
          >
            <Home size={18} />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;