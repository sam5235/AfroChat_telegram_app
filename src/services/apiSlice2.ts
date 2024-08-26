import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { generateToken } from "./api_token";
const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

const prepareHeader = async (headers: Headers) => {
  const token = await generateToken();
  const access_token = getAccessToken();
  headers.set("Authorization", `Bearer ${access_token}`);
  headers.set("accept", "application/json");
  headers.set("Content-Type", "application/json");
  headers.set("X-API-KEY", token);
  return headers;
};
export const usersApi2 = createApi({
  reducerPath: "usersApi2",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.afro.fit/api_v2",
    prepareHeaders: (headers) => {
      return prepareHeader(headers);
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.query({
      query: ({provider, access_token, signup_platform}) => ({
        url: "/auth/sign_in_third_party",
        method: "POST",
        body: { provider, access_token, signup_platform },
      }),
    }),
    validateBotL: builder.query({
      query: (body) =>({
        url: "/auth/validate_telegram_request",
        method: "Post",
        body: JSON.stringify(body)
      })
    })
  }),
});
export const { useSignInQuery, useValidateBotLQuery } = usersApi2;
