"use client";

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import styles from "./page.module.css";
import { useLogin } from "@/src/lib/login/mutations";
import { useCsrf, useSession } from "@/src/lib/login/queries";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const PasswordIcon = showPassword ? EyeOff : Eye;

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { mutate: login, isPending: isLoggingIn, error, reset } = useLogin();
  const { isFetching: isFetchingCsrfToken } = useCsrf();

  const { data: hasSession, isLoading: isLoadingHasSession } = useSession();

  useEffect(() => {
    if (!isLoadingHasSession && hasSession && !isLoggingIn) {
      router.push("/job-applications");
    }
  }, [hasSession, isLoadingHasSession, router, isLoggingIn]);

  return (
    <div className={styles.page}>
      <header className={styles.brand}>
        <span className={styles.mark}>
          <ArrowUpRight size={20} aria-hidden="true" />
        </span>
        Application Tracker
      </header>
      <main className={styles.main}>
        <section className={styles.panel} aria-labelledby="login-title">
          <h1 id="login-title">Sign in to your workspace</h1>
          <form
            className={styles.form}
            method="post"
            onChange={() => { if (error) reset(); }}
            onSubmit={(event) => {
              event.preventDefault();
              login(credentials);
            }}
          >
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
                value={credentials.username}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    username: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className={styles.password}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      password: event.target.value,
                    })
                  }
                />
                <button
                  className={styles.reveal}
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-controls="password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <PasswordIcon size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <button
              className={styles.submit}
              type="submit"
              disabled={isFetchingCsrfToken || isLoggingIn}
            >
              {isLoggingIn ? "Signing in…" : "Sign in"}
            </button>
            {error && (
              <p className={styles.notice} role="alert">
                {isAxiosError(error) && error.response?.status === 401
                  ? "Incorrect username or password."
                  : "Couldn’t sign in. Please try again."}
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}
