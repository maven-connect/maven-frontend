import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLostandFound } from "@/pages/api/api";

export const createLostandFound = createAsyncThunk(
  "create/lostandfound",
  async ({ itemName, description, imageFile, selectedOption }) => {
    const response = await postLostandFound({
      itemName,
      description,
      imageFile,
      selectedOption,
    });
    return response.data;
  }
);

export const lostAndFoundSlice = createSlice({
  name: "lostandfound",

  initialState: {
    data: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(createLostandFound.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLostandFound.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })
      .addCase(createLostandFound.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectLostAndFound = (state) => state.lostandfound;

export default lostAndFoundSlice.reducer;
