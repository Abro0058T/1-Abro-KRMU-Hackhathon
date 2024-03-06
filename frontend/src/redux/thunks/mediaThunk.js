import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/video";

const getAllMediaThunk = createAsyncThunk("/allVideos", async () => {
  try {
    // console.log("inside thunk");
    const response = await axios.get(`${BASE_URL}/allVideos`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetching video", error);
    throw error;
  }
});

const getAllImageThunk = createAsyncThunk("/allImages", async () => {
  try {
    // console.log("inside thunk");
    const response = await axios.get(`${BASE_URL}/allImages`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetching image", error);
    throw error;
  }
});

const getAllReelThunk = createAsyncThunk("/allReels", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allReels`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetching reels:", error);
    throw error;
  }
});

const getSingleMediaThunk = createAsyncThunk("/singleVideo", async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/singleVideo/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetching single video:", error);
    throw error;
  }
});

const getSingleImageThunk = createAsyncThunk("/singleImage", async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/singleImage/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetching single Image", error);
    throw error;
  }
});

const getSingleReelThunk = createAsyncThunk("/singleReel", async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/singleReel/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetching single Reel", error);
    throw error;
  }
});

export {
  getAllMediaThunk,
  getAllImageThunk,
  getAllReelThunk,
  getSingleMediaThunk,
  getSingleImageThunk,
  getSingleReelThunk,
};
