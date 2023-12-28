import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  userName: string;
  password: string;
  stories: User[];
  posts: User[];
  notifications: string[];
  isPublic: boolean;
  following: User[];
  follower: User[];
  blockList: User[];
  bio: {
    info: string;
    country: string;
  };
}

interface Notification {
  id: string;
  content: string;
}

export interface userState {
  data: User[];
  user: User;
  status: string;
  error: string | null | undefined;
}

const initialState: userState = {
  data: [],
  user: {
    id: "",
    name: "",
    surname: "",
    email: "",
    userName: "",
    password: "",
    stories: [],
    posts: [],
    notifications: [],
    isPublic: true,
    following: [],
    follower: [],
    blockList: [],
    bio: {
      info: "",
      country: "",
    },
  },
  status: "idle",
  error: null,
};

export const fetchUserData = createAsyncThunk<User[]>(
  "user/fetchUserData",
  async () => {
    const response = await axios.get(
      `https://users-api-qyxa.onrender.com/users`
    );
    return response.data;
  }
);

export const fetchOneUserData = createAsyncThunk<User>(
  "user/fetchOneUserData",
  async (id) => {
    const response = await axios.get(
      `https://users-api-qyxa.onrender.com/users/${id}`
    );
    return response.data;
  }
);

export const postUserData = createAsyncThunk<User, User>(
  "user/postUserData",
  async (obj) => {
    const response = await axios.post(
      "https://users-api-qyxa.onrender.com/users",
      obj
    );
    return response.data;
  }
);

// export const deleteUserData = createAsyncThunk<string, string>(
//   "user/deleteUserData",
//   async (userId) => {
//     await axios.delete(`https://users-api-qyxa.onrender.com/users/${userId}`);
//     return userId;
//   }
// );

export const deletePost = createAsyncThunk(
  "user/deletePost",
  async ({ userID, imgID }) => {
    const found = await axios.get(
      `https://users-api-qyxa.onrender.com/users/${userID}`
    );

    const foundedUser = found.data;
    console.log(foundedUser);
    const updated = foundedUser.posts.filter((item) => item._id != imgID);

    await axios.patch(`https://users-api-qyxa.onrender.com/users/${userID}`, {
      posts: updated,
    });
  }
);

export const = createAsyncThunk<User, User>(
  "user/postUserData",
  async (obj) => {
    const response = await axios.post(
      "https://users-api-qyxa.onrender.com/users",
      obj
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {},
    deleteUserData: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);

      axios.delete(
        `https://users-api-qyxa.onrender.com/users/${action.payload}`
      );
    },

    sendNotification: (state, action: PayloadAction<Notification>) => {
      state.data.forEach((item) => {
        axios.patch(`https://users-api-qyxa.onrender.com/users/${item.id}`, {
          notifications: [...notifications, action.payload],
        });
        console.log(action.payload);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchOneUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOneUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchOneUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(postUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })
      .addCase(postUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to post user data";
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        console.log("loading");
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("delete");
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to delete user";
      });
  },
});

export const { addUser, deleteUserData, sendNotification } = userSlice.actions;

export default userSlice.reducer;
