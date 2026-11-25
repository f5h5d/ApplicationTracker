import type { csrf } from "@/app/login/types";
import axios from "axios";

export const login = async (
  credentials: {
    username: string;
    password: string;
  },
  csrf:
    | {
        token: string;
        headerName: string;
      }
    | undefined,
) => {
  if (!csrf) {
    throw new Error("CSRF token is not available");
  }
  await axios.post(
    "http://localhost:8080/login",
    new URLSearchParams({
      username: credentials.username,
      password: credentials.password,
    }),
    {
      withCredentials: true,
      headers: {
        [csrf.headerName]: csrf.token,
      },
    },
  );
};

export const fetchCsrfToken = async () => {
  const response = await axios.get<NonNullable<csrf>>(
    "http://localhost:8080/api/csrf",
    {
      withCredentials: true,
    },
  );

  if (!response.data) {
    throw new Error("Failed to fetch CSRF token");
  }

  return response.data;
};

export const logout = async (csrf: csrf) => {
  if (!csrf) {
    throw new Error("CSRF token is not available");
  }
  await axios.post("http://localhost:8080/logout", null, {
    withCredentials: true,
    headers: { [csrf.headerName]: csrf.token },
  });
};

export const fetchSession = async () => {
  const response = await axios.get<boolean>("http://localhost:8080/api/session", {
    withCredentials: true,
  });

  return response.data;
};
