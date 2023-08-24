import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGroupParticipants } from "@/pages/api/api";

export const fetchGroupParticipants = createAsyncThunk(
  "fetch/groupParticpants",
  async ({groupName}) => {
    const response = await getGroupParticipants(groupName);
    return response.data;
  }
);

export const groupParticipantsSlice = createSlice({
  name: "groupParticipants",

  initialState: {
    data: {},
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchGroupParticipants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroupParticipants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.userList;
      })
      .addCase(fetchGroupParticipants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const selectGroupParticipants = (state) => state.groupParticipants;

export default groupParticipantsSlice.reducer;
