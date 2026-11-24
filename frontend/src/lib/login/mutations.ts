import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "./api";
import { useRouter } from "next/navigation";
import { getCsrfToken } from "../job-applications/helpers";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const csrf = await getCsrfToken(queryClient);
      await logout(csrf);
    },
    onSuccess: () => {
      queryClient.clear();
      router.replace("/login");
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentials: { username: string; password: string }) => {
      const csrf = await getCsrfToken(queryClient);
      return login(credentials, csrf);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["csrf"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/job-applications");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
