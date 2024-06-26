import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/users";

const registerUserThunk = createAsyncThunk("/register", async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${BASE_URL}/register`, data);
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

const getAllUsersThunk = createAsyncThunk("/", async (adminId) => {
  try {
    console.log("here")
    const response = await axios.get(`${BASE_URL}/allMembers?adminId=${adminId.adminId}`);
    console.log(response.data,"data")
    return response.data;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
});


const registerMemberUserThunk = createAsyncThunk("/registerMember", async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${BASE_URL}/addMembers`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
});


export { registerUserThunk, loginUserThunk, getAllUsersThunk ,registerMemberUserThunk};
