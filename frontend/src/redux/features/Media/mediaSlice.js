import { createSlice } from "@reduxjs/toolkit";
import {
  getAllImageThunk,
  getAllMediaThunk,
  getAllReelThunk,
  getSingleMediaThunk,
  getSingleReelThunk,
  getSingleImageThunk,
  uploadMediaThunk
} from "../../thunks/mediaThunk";
// import { logoutUserThunk } from "../../thunks/logoutThunk";

const initialState = {
  mediaInfo: {},
  isLoading: false,
  error: null,
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

    //   Upload Media - {Video, Image, Reel}
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
      });
  },
});

export const { resetAppError } = mediaSlice.actions;
export const selectAuth = (state) => state.auth;
export default mediaSlice.reducer;
