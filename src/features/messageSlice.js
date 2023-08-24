import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { approveISP, fetchGroupData } from "@/pages/api/api";

export const fetchMessages = createAsyncThunk(
  "fetch/messages",
  async ({ groupName }) => {
    const response = await fetchGroupData(groupName);
    return { groupName, data: response.data };
  }
);
export const approveMessages = createAsyncThunk(
  "fetch/approveMessages",
  async (data) => {
    const response = await approveISP(data);
    return response['data'];
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
        state.data[action.payload.groupName] = action.payload.data;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(approveMessages.fulfilled, (state, action) => {
        const changeIndex = state.data[action.payload.groupName][
          "isp"
        ].findIndex((el) => el.id == action.payload.id);
        state.data[action.payload.groupName]["isp"][changeIndex] = {
          ...action.payload,
        };
      });
  },
});

export const selectMessages = (state) => state.message;

export default messageSlice.reducer;
