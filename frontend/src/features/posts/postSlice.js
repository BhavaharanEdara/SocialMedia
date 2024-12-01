import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { useDispatch } from "react-redux";
import { setTokenExpired } from "../users/userSlice";
import getconfig from "../../utils/config";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/posts`, data, getconfig());
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(setTokenExpired(true));
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/posts`, getconfig());
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(setTokenExpired(true));
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePosts = createAsyncThunk(
  "posts/updatePosts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}/posts/edit/${data.id}`,
        data.data,
        getconfig()
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(setTokenExpired(true));
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${base_url}/post/${id}`,
        getconfig()
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(setTokenExpired(true));
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idel",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.posts.push(action.payload);
    });
    builder.addCase(addPost.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getPosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(updatePosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updatePosts.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
    });
    builder.addCase(updatePosts.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(deletePost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.posts = state.posts.filter(
        (post) => post._id != action.payload._id
      );
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default postSlice.reducer;
