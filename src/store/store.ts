import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../services/userSlice";
import { usersApi } from "../services/apiSlices.ts";
import inputSlice from "../services/inputSlice.ts";
import personaSlice from "../services/personaSlice.ts";
import chatsSlice from "../services/chatsSlice.ts";
import historySlice from "../services/historySlice.ts";
import responseSlice from "../services/responseSlice.ts";
import exploreSlice from "../services/exploreSlice.ts";
import { usersApi2 } from "../services/apiSlice2.ts";


export const store = configureStore({
  reducer: {
    user: userSlice,
    input: inputSlice,
    persona: personaSlice,
    chats: chatsSlice,
    history: historySlice,
    responses: responseSlice,
    explore: exploreSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [usersApi2.reducerPath]: usersApi2.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(usersApi2.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
