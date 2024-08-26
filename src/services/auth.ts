import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useEffect } from "react";
import { useSignInQuery } from "./apiSlice2";

export const useAuth = () => {
  const webApp = useWebApp();
  const initData = webApp.initData || "";
  const { data, error, refetch } = useSignInQuery({
    provider: "telegram",
    access_token: initData,
    signup_platform: "telegram_bot",
  });

  useEffect(() => {
    if (data) {
      // Store tokens in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      // Token expired or unauthorized, attempt to refresh
      refreshAccessToken().then((newAccessToken) => {
        if (newAccessToken) {
          localStorage.setItem("access_token", newAccessToken);
          refetch(); // Retry the sign-in with the new token
        }
      });
    }
  }, [error, refetch]);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    try {
      const response = await fetch(
        "https://api.afro.fit/api_v2/auth/refresh_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }
      );

      if (response.ok) {
        const { access_token: newAccessToken } = await response.json();
        return newAccessToken;
      } else {
        console.error("Failed to refresh token");
        return null;
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      return null;
    }
  };

  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  return { getAccessToken };
};
