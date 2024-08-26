import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MyPersonaType = {
    full_name: string;
    persona_type: string;
    persona_image: string;
    default_color: string;
    description: string;
    long_description: string;
    is_premium: false;
    id: string;
    creator_uuid: string;
    created_at: string;
    quotes: {
      quote: string;
    }[];
    visible: true;
    age: number;
    occupation: string;
    additional_info: string;
  };

interface MyPersonaState {
  myPersonaList: MyPersonaType[];
  limit: number;
  offset: number;
  total:number;
}

const initialState: MyPersonaState = {
  myPersonaList: [],
  limit: 4,
  offset: 0,
  total:0,
};

const pesonaSlice = createSlice({
  name: "mypersona",
  initialState,
  reducers: {
    setMyPersonaList: (state, action: PayloadAction<MyPersonaType[]>) => {
      const newPersonas = action.payload;
      newPersonas?.forEach((newPersona) => {
        if(!state.myPersonaList.some((persona : any)=> persona.id === newPersona.id)) {
          state.myPersonaList.push(newPersona)
        }
      });
    },
    removeMyPersonaItem: (state, action: PayloadAction<string>) => {
      state.myPersonaList = state.myPersonaList.filter((item) => item.id !== action.payload);
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    settotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    }
  }
});
export const { setMyPersonaList, removeMyPersonaItem, setLimit, setOffset, settotal } = pesonaSlice.actions;
export default pesonaSlice.reducer;

