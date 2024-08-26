import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ExploreState {
  exploreList: any[];
  limit: number;
  offset: number;
  total:number;
  searchQuery: string;
}

const intialState: ExploreState = {
  exploreList: [],
  limit: 5,
  offset: 0,
  total:0,
  searchQuery: "",
};

const exploreSlice = createSlice({
  name: "explore",
  initialState: intialState,
  reducers: {
    setExploreList: (state, action: PayloadAction<any[]>) => {
      const newPersonas = action.payload;
      newPersonas.forEach((newPersona) => {
        if(!state.exploreList.some((persona)=> persona.id === newPersona.id)) {
          state.exploreList.push(newPersona)
        }
      });
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    resetState: (state) => {
      state.exploreList = [];
      state.limit = 5;
      state.offset = 0;
    },
    setFavourite: (state, action: PayloadAction<string>) => {
      const personaId = action.payload;
      const persona = state.exploreList.find((persona) => persona.id === personaId);
      if (persona) {
        persona.is_preferable_entity = !persona.is_preferable_entity;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

  },
});

export const{
  setExploreList,
  setLimit,
  setOffset,
  resetState,
  setTotal,
  setFavourite,
  setSearchQuery,
} = exploreSlice.actions
export default exploreSlice.reducer;