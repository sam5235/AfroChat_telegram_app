import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialChat :any[] = [
  {
    id: 1,
    ask_session_id: "1",
    question:
      "",
    summary:
      "",
    sources: [
      {
        id: 1,
        URL: "/response/source.svg",
        title: "X",
        short_description: "",
      },
    ],
    recommendations: [],
    created_at: "",updated_at: "",
    llm_model: "",}]

type setResponses = {
  chats: any[];
  
};

const initialState: setResponses = {
  chats: initialChat,
};

const responsesSllice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    addResponse(state, action: PayloadAction<any>) {
      const existingMessage = state.chats.find(item => item.question === action.payload.question);
      if (!existingMessage) {
        state.chats.push(action.payload);
      }
    },
    setResponse(state, action: PayloadAction<any[]>) {
      action.payload.forEach((item) => {
        state.chats.push(item);
      });
      state.chats[action.payload.length] = {
        ...state.chats[action.payload.length],
        recommendations: [...action.payload[action.payload.length - 1].recommendations],
      };
    },
    removeResponse(state, action: PayloadAction<number>) {
      state.chats = state.chats.filter((item) => item.id !== action.payload);
    },
    resetResponse(state) {
      state.chats = initialChat;
    }
  },
});

export const { addResponse,setResponse, removeResponse, resetResponse } = responsesSllice.actions;
export default responsesSllice.reducer;
