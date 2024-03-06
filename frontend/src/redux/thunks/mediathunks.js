import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/video";

const  getMediaThunk = createAsyncThunk("/allVideos", async (data) => {
  try {
    console.log(data);
    const response = await axios.get(`${BASE_URL}/allVideos`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
});

const loginUserThunk = createAsyncThunk("/login", async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
});

const getAllUsersThunk = createAsyncThunk("/", async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
});

export { registerUserThunk, loginUserThunk, getAllUsersThunk };
