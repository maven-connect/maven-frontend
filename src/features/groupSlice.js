import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchUserGroups} from "@/pages/api/api";

export const fetchGroups = createAsyncThunk("fetch/groups", async () => {
  const response = await fetchUserGroups();
  return response.data;
});

export const groupSlice = createSlice({
  name: "groups",

  initialState: {
    data: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.groups;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectGroups = (state) => state.group;

export default groupSlice.reducer;
