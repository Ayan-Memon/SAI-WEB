"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store/store";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import LenisProvider from "@/components/UI/LenisProvider";

const AppInitializer = () => {
  useCurrentUser();
  return null;
};

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5,
          },
        },
      }),
  );

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppInitializer />
        {/* <LenisProvider /> */}
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
