import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface HistoryState {
  historyList: any[];
  limit: number;
  offset: number;
  total:number;
}
const initialState: HistoryState = {
  historyList: [],
  limit: 10,
  offset: 0,
  total:0,
};
const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setHistoryList: (state, action: PayloadAction<any[]>) => {
            const newHistory = action.payload;
            newHistory.forEach((newItem) => {
                if(!state.historyList.some((item)=> item.id === newItem.id)) {
                    state.historyList.push(newItem)
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
            state.historyList = [];
            state.limit = 5;
            state.offset = 0;
        },
    }
});
export const { setHistoryList, setLimit, setOffset, setTotal, resetState } = historySlice.actions;
export default historySlice.reducer;
