import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean
}

const initialState: UserState = {
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<UserState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
