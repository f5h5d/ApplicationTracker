import { useQuery } from "@tanstack/react-query";
import { fetchCsrfToken, fetchSession } from "./api";

export const useCsrf = () =>
  useQuery({
    queryKey: ["csrf"],
    queryFn: async () => fetchCsrfToken(),
  });

export const useSession = () =>
  useQuery({
    queryKey: ["session"],
    queryFn: async () => fetchSession(),
    staleTime: 5 * 60 * 1000, // Cache the session for 5 minutes
  });
