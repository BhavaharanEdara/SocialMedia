import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/base_url";
import getconfig from "../../utils/config";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/login`, data);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const addLikedPost = createAsyncThunk(
  "users/addLikedPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/users/add_liked_post/${data.userId}`,
        data.data,
        getconfig()
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const removeLikedPost = createAsyncThunk(
  "users/removeLikedPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/users/remove_liked_post/${data.userId}`,
        data.data,
        getconfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const addBookMark = createAsyncThunk(
  "users/addBookMark",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/users/add_book_mark/${data.userId}`,
        data.data,
        getconfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const removeBookMark = createAsyncThunk(
  "users/removeBookMark",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/users/remove_book_mark/${data.userId}`,
        data.data,
        getconfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/users/${data.id}`,
        data.data,
        getconfig()
      );
      localStorage.setItem("token", response.data.token);
      return response.data.updatedUser;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);
export const followUser = createAsyncThunk(
  "users/followUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/users/follow_user/${data.id}`,
        data.data,
        getconfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}/users/unfollow_user/${data.id}`,
        data.data,
        getconfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
    users: [],
    status: "idle",
    error: null,
    tokenExpired: false,
  },
  reducers: {
    logOutUser: (state, action) => {
      state.profile = {};
      localStorage.setItem("token", "");
    },
    setUser: (state, action) => {
      state.profile = action.payload;
    },
    setTokenExpired: (state, action) => {
      state.tokenExpired = action.payload;
    },
    resetError: (state, action) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(addLikedPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addLikedPost.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload;
    });
    builder.addCase(addLikedPost.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload?.status === 401) {
        state.profile = {};
        state.tokenExpired = true;
      }
    });
    builder.addCase(removeLikedPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(removeLikedPost.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload;
    });
    builder.addCase(removeLikedPost.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload?.status === 401) {
        state.profile = {};
        state.tokenExpired = true;
      }
    });
    builder.addCase(addBookMark.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addBookMark.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload;
    });
    builder.addCase(addBookMark.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload?.status === 401) {
        state.profile = {};
        state.tokenExpired = true;
      }
    });
    builder.addCase(removeBookMark.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(removeBookMark.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload;
    });
    builder.addCase(removeBookMark.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload?.status === 401) {
        state.profile = {};
        state.tokenExpired = true;
      }
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.users = [...action.payload];
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload?.status === 401) {
        state.profile = {};
        state.tokenExpired = true;
      }
    });
    builder.addCase(followUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload;
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload?.status === 401) {
        state.profile = {};
        state.tokenExpired = true;
      }
    });

    builder.addCase(unfollowUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload;
    });
    builder.addCase(unfollowUser.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload?.status === 401) {
        state.profile = {};
        state.tokenExpired = true;
      }
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "rejected";
      if (action.payload?.status === 401) {
        state.profile = {};
        state.tokenExpired = true;
      }
    });
  },
});

export const { logOutUser, setTokenExpired, setUser, resetError } =
  userSlice.actions;

export default userSlice.reducer;
