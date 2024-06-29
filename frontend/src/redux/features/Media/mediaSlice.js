import { createSlice } from "@reduxjs/toolkit";
import {
  getAllImageThunk,
  getAllMediaThunk,
  getAllReelThunk,
  getSingleMediaThunk,
  getSingleReelThunk,
  getSingleImageThunk,
  uploadMediaThunk,
  uploadImageThunk,
  uploadReelThunk,
  initializeProjectThunk,
  // getAllProject,
  getAllProjectThunk,
} from "../../thunks/mediaThunk";
// import { logoutUserThunk } from "../../thunks/logoutThunk";

const initialState = {
  mediaInfo: {},
  isLoading: false,
  error: null,
  projectinitialize:false,
  projectIntializeDetails:[],
  allProjectDetails:[]
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    resetAppError: (state) => {
      state.appErr = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Videos
      .addCase(getAllMediaThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMediaThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(getAllMediaThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //   Images
      .addCase(getAllImageThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllImageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(getAllImageThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //   Reels
      .addCase(getAllReelThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReelThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(getAllReelThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //   Single Video
      .addCase(getSingleMediaThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleMediaThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(getSingleMediaThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // single Image
      .addCase(getSingleImageThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleImageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(getSingleImageThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // single Reel
      .addCase(getSingleReelThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleReelThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(getSingleReelThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //   Upload Video
      .addCase(uploadMediaThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadMediaThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(uploadMediaThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //   Upload Image
      .addCase(uploadImageThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(uploadImageThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Upload Reel
      .addCase(uploadReelThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadReelThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mediaInfo = action.payload;
      })
      .addCase(uploadReelThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(initializeProjectThunk.pending,(state,action)=>{
        state.isLoading=true;
        state.projectinitialize=false;
        // state.projectIntializeDetails=action.payload
      })
      .addCase(initializeProjectThunk.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.projectinitialize=true;
        state.projectIntializeDetails=action.payload
      })
      .addCase(initializeProjectThunk.rejected,(state,action)=>{
        state.isLoading=false;
        state.projectinitialize=false;
        state.error="Error initializing project"
      })
      .addCase(getAllProjectThunk.pending,(state,action)=>{
        state.isLoading=true;
      })
      .addCase(getAllProjectThunk.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.allProjectDetails=action.payload
      })
      .addCase(getAllProjectThunk.rejected,(state,action)=>{
        state.isLoading=false;
        state.error="error getting all projects"
      })
  },

});

export const { resetAppError } = mediaSlice.actions;
export const selectAuth = (state) => state.auth;
export default mediaSlice.reducer;
