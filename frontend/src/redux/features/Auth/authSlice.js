import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  getAllUsersThunk,
  registerMemberUserThunk,
} from "../../thunks/userThunk";
import { initializeProjectThunk } from "../../thunks/mediaThunk";
// import { logoutUserThunk } from "../../thunks/logoutThunk";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isAuth: false,
  isLoading: false,
  error: null,
  userData:[],
  addMember:false,
  memberData:[],

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
      .addCase(loginUserThunk.fulfilled, (state,action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.userData=action.payload.userData
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllUsersThunk.pending, (state,action) => {
        state.isLoading = true;
        state.isAuth = true;
        console.log(action.payload,"data in slice")
        state.memberData = action.payload;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload,"data in slice")
        state.memberData = action.payload.data;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerMemberUserThunk.pending,(state,action)=>{
        state.isLoading = true;
        state.addMember=false;
      })
      .addCase(registerMemberUserThunk.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.addMember=true;
      })
      .addCase(registerMemberUserThunk.rejected,(state,action)=>{
        state.isLoading=false;
        state.error="Error adding member"
        state.addMember=false
      })
    
  },

});

export const { resetAppError } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
