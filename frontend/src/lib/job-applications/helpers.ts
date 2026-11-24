import { csrf } from "@/app/login/types";
import { QueryClient } from "@tanstack/react-query";
import { fetchCsrfToken } from "../login/api";

export const getCsrfToken = async (queryClient: QueryClient): Promise<csrf> => {
  return await queryClient.query<csrf>({
    queryKey: ["csrf"],
    queryFn: fetchCsrfToken,
    staleTime: "static", // only fetch the CSRF token once and cache it indefinitely
  });
};
