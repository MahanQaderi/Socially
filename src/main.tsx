import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/route'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // a 4xx is a real answer (not logged in, not found), anything else is worth another try
      retry: (failureCount, error) => {
        const status = (error as AxiosError)?.response?.status;

        if (status && status >= 400 && status < 500) return false;

        return failureCount < 2;
      },
    },
  },
});

const savedTheme = localStorage.getItem('theme');

// fall back to the system preference the first time somebody opens the app
const prefersDark =
  savedTheme === null &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || prefersDark) {
  document.documentElement.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
} else {
  document.documentElement.classList.add('light-mode');
  localStorage.setItem('theme', 'light');
}

createRoot(document.getElementById('root')!).render(  
  <>
    <Toaster
      position="top-center"
      containerStyle={{ top: 80 }}
      toastOptions={{
        duration: 3000,
        className:
          'bg-white! text-[#171717]! border! border-[#E5E5E5]! shadow-lg! dark:bg-[#171717]! dark:text-[#FAFAFA]! dark:border-[#333333]!',
      }}
    />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </>,
)
