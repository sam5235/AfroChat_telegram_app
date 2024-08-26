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
  headers.set("X-API-TOKEN", token);
  return headers;
};
export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://afrochat-bot-telegram-ij7jnmwh2q-zf.a.run.app/api_v1",
    prepareHeaders: (headers) => {
      return prepareHeader(headers);
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.query({
      query: (body) => ({
        url: "/auth/telegram_signin",
        method: "POST",
        body: { ...body },
      }),
    }),
    getExplore: builder.query({
      query: ({ searchWord, limit, offset, selectedTag }) => {
        if (selectedTag) {
          return `/explore/get_by_tag?search_query=${searchWord}&limit=${limit}&offset=${offset}&tag=${selectedTag}`;
        } else {
          return `/explore/search?search_query=${searchWord}&limit=${limit}&offset=${offset}`;
        }
      },
    }),
    getExploreTags: builder.query({
      query: () => {
        return "/explore/get_tags";
      },
    }),
    getAskResponse: builder.query({
      query: ({ ask_session_id, question, model, message_from = 4 }) => {
        if (ask_session_id) {
          return {
            url: "/ask/ask_follow_up",
            method: "POST",
            body: { question, model, message_from, ask_session_id },
          };
        } else {
          return {
            url: "/ask/ask",
            method: "POST",
            body: { question, model, message_from },
          };
        }
      },
    }),
    getChatResponse: builder.query({
      query: ({
        question,
        model,
        message_from,
        image_url,
        image_mask_url,
        chat_session_id,
        persona_id,
        sub_tool_id,
        image_model,
        audio_model,
        voice_option,
        type,
      }) => {
        if (type === "Persona") {
          return {
            url: "/chat/ask",
            method: "POST",
            body: {
              question,
              model,
              message_from,
              image_url,
              image_mask_url,
              chat_session_id,
              persona_id,
              image_model,
              audio_model,
              voice_option,
            },
          };
        } else {
          return {
            url: "/chat/ask",
            method: "POST",
            body: {
              question,
              model,
              message_from,
              image_url,
              image_mask_url,
              chat_session_id,
              sub_tool_id,
              image_model,
              audio_model,
              voice_option,
            },
          };
        }
      },
    }),
    getCreateNewChat: builder.query({
      query: ({
        question,
        model,
        message_from,
        image_url,
        image_mask_url,
        persona_id,
        sub_tool_id,
        image_model,
        audio_model,
        voice_option,
        type,
      }) => {
        if (type === "Persona") {
          return {
            url: "/chat/new_chat",
            method: "POST",
            body: {
              question,
              model,
              message_from,
              image_url,
              image_mask_url,
              persona_id,
              image_model,
              audio_model,
              voice_option,
            },
          };
        } else {
          return {
            url: "/chat/new_chat",
            method: "POST",
            body: {
              question,
              model,
              message_from,
              image_url,
              image_mask_url,
              sub_tool_id,
              image_model,
              audio_model,
              voice_option,
            },
          };
        }
      },
    }),
    getHistory: builder.query({
      query: ({ limit, offset}) =>
        `/ask/get_sessions/?limit=${limit}&offset=${offset}`,
    }),
    getChatDetails: builder.query({
      query: ({ chat_session_id, type }) => {
        if (type === "Chat") return `/chat/chat_history/${chat_session_id}`;
        else return `/ask/get_chat_messages/${chat_session_id}`;
      },
    }),
    getAIModels: builder.query({
      query: ({ model_type }) =>
        `/chat/models?model_type=${model_type}&is_active=true`,
    }),
    getMyPersona: builder.query({
      query: ({ search_query, limit, offset }) =>
        `/persona/get_my_personas?search_query=${search_query}&limit=${limit}&offset=${offset}`,
    }),
    favouritePersona: builder.mutation({
      query: (body) => ({
        url: "/explore/toggle_preferable_entity",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useSignInQuery,
  useGetExploreQuery,
  useGetExploreTagsQuery,
  useGetAskResponseQuery,
  useGetChatResponseQuery,
  useGetCreateNewChatQuery,
  useGetHistoryQuery,
  useGetChatDetailsQuery,
  useGetAIModelsQuery,
  useGetMyPersonaQuery,
  useFavouritePersonaMutation,
} = usersApi;
