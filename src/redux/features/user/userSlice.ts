import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isUserLoggedIn: false,
  isError: false,
  errorMessage: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        username: string;
        role: string;
      }>
    ) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isUserLoggedIn = true;
    },
    loginFailure: (state) => {
      state.isError = true;
      state.errorMessage = "Failed to login";
    },
    logout: (state) => {
      state.username = "";
      state.isUserLoggedIn = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
