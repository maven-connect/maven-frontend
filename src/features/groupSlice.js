import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createGroup, fetchUserGroups } from "@/pages/api/api";

export const fetchGroups = createAsyncThunk("fetch/groups", async () => {
  const response = await fetchUserGroups();
  return response.data;
});

export const createNewGroup = createAsyncThunk(
  "create/group",
  async ({ group_name, group_batch, group_branch, description }) => {
    const response = await createGroup({
      group_batch,
      group_branch,
      group_name,
      description,
    });
    return response.data;
  }
);

export const groupSlice = createSlice({
  name: "group",

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
      })
      .addCase(createNewGroup.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
      });
  },
});

export const selectGroups = (state) => state.group;

export default groupSlice.reducer;
