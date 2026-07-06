import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      if (action.payload.accessToken !== undefined) {
        state.accessToken = action.payload.accessToken;
      }

      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isVerified = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
