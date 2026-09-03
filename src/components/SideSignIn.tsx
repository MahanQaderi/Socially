import React from 'react';
import { NavLink } from 'react-router';

export const SideSignIn: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-card flex flex-col items-center sticky top-24 text-center transition-colors duration-300 w-full">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
        Welcome Back!
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed max-w-55">
        Login to access your profile and connect with others.
      </p>
      
      <div className="w-full flex flex-col gap-3">
        <NavLink
          to={"/login"}
          className="w-full py-2.5 px-4 rounded-xl font-medium cursor-pointer transition-all duration-300 ease-in-out
            bg-zinc-900 text-white border border-transparent
            hover:bg-zinc-800 hover:shadow-md hover:-translate-y-0.5
            dark:bg-white dark:text-zinc-950 dark:border-zinc-800
            dark:hover:bg-zinc-200 dark:hover:shadow-lg dark:hover:shadow-zinc-900/50"
        >
          Log In
        </NavLink>
        
        <NavLink
          to={"/register"}
          className="w-full py-2.5 px-4 rounded-xl font-medium cursor-pointer transition-all duration-300 ease-in-out
            bg-white text-zinc-900 border border-zinc-300
            hover:bg-zinc-100 hover:border-zinc-400 hover:shadow-md hover:-translate-y-0.5
            dark:bg-zinc-900/50 dark:text-zinc-100 dark:border-zinc-800
            dark:hover:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:text-white dark:hover:shadow-md dark:hover:-translate-y-0.5"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default SideSignIn;
