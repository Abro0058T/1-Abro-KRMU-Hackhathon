import { createSlice } from "@reduxjs/toolkit";
import {
  getMediaThunk,
  ,
  getAllUsersThunk,
} from "../../thunks/userThunk";
// import { logoutUserThunk } from "../../thunks/logoutThunk";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isAuth: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAppError: (state) => {
      state.appErr = null;
    },
  },

  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchUserDataThunk.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(fetchUserDataThunk.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(fetchUserDataThunk.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.error.message;
    //   })
    //   .addCase(logoutUserThunk.fulfilled, (state) => {
    //     state.userInfo = null;
    //     localStorage.clear();
    //     state.isAuth = false; // Update auth state
    //   }),

    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuth = true;
        state.data = null;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetAppError } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
