import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface SelectionState {
  selectedInput: string;
  selectedModel: string;
  searchedWord: string;
  session_id: string;
  persona_id: string;
  sub_tool_id: string;
}

const initialState: SelectionState = {
  selectedInput: "Ask Anything",
  selectedModel: "GPT 3.5",
  searchedWord: "",
  session_id: "",
  persona_id: "",
  sub_tool_id: "",
};

const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {
    setSelectedInput: (state, action: PayloadAction<{ title: string }>) => {
      state.selectedInput = action.payload.title;
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload;
    },
    setSearchedWord: (state, action: PayloadAction<string>) => {
      state.searchedWord = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.session_id = action.payload;
    },
    setPersonaId: (state, action: PayloadAction<string>)=>{
      state.persona_id = action.payload;
    },
    setSubToolId : (state, action: PayloadAction<string>)=>{
      state.sub_tool_id = action.payload;
    }
  },
});

export const {
  setSelectedInput,
  setSelectedModel,
  setSearchedWord,
  setSessionId,
  setPersonaId,
  setSubToolId,
} = selectionSlice.actions;
export default selectionSlice.reducer;
