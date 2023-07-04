import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getProfile} from "@/pages/api/api";

export const fetchProfile = createAsyncThunk("profile", async () => {
  const response = await getProfile();
  return response.data;
});

export const profileSlice = createSlice({
  name: "profile",

  initialState: {
    data: {},
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;
