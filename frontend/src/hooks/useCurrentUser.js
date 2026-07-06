import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/userQueries";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,

    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 30,

    // refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
