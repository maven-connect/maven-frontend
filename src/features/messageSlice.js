import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserMessages } from "@/pages/api/api";

export const fetchMessages = createAsyncThunk(
  "fetch/messages",
  async ({ groupName }) => {
    const response = await fetchUserMessages(groupName);
    return { groupName, data: response.data };
  }
);

export const messageSlice = createSlice({
  name: "message",

  initialState: {
    data: {},
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data[action.payload.groupName] = action.payload.data.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectMessages = (state) => state.message;

export default messageSlice.reducer;
