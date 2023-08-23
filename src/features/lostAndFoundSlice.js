import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  contactLostAndFound,
  deleteLostandFound,
  getLostandFound,
  postLostandFound,
} from "@/pages/api/api";

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

export const fetchLostandFound = createAsyncThunk(
  "fetch/lostandfound",
  async () => {
    const response = await getLostandFound();
    return response.data;
  }
);
export const removeLostandFound = createAsyncThunk(
  "delete/lostandfound",
  async (id) => {
    const response = await deleteLostandFound({ id });
    return response.data;
  }
);

export const contactLostandFoundThunk = createAsyncThunk(
  "contact/lostandfound",
  async (item) => {
    const response = await contactLostAndFound(item.id);
    return { data: response.data, item: item };
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
      .addCase(fetchLostandFound.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLostandFound.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchLostandFound.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createLostandFound.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLostandFound.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.meta.arg.selectedOption === "LOST") {
          state.data["LostData"] = [action.payload, ...state.data["LostData"]];
        } else {
          state.data["FoundData"] = [
            action.payload,
            ...state.data["FoundData"],
          ];
        }
      })
      .addCase(createLostandFound.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeLostandFound.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeLostandFound.fulfilled, (state, action) => {
        state.status = "succeeded";
        const lostDataIndex = state.data["LostData"].findIndex(
          (item) => item.id === action.meta.arg
        );

        const foundDataIndex = state.data["FoundData"].findIndex(
          (item) => item.id === action.meta.arg
        );

        if (lostDataIndex !== -1) {
          state.data["LostData"].splice(lostDataIndex, 1);
        } else if (foundDataIndex !== -1) {
          state.data["FoundData"].splice(foundDataIndex, 1);
        }
      })
      .addCase(removeLostandFound.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(contactLostandFoundThunk.fulfilled, (state, action) => {
        let itemIndex = state.data["LostData"].findIndex(
          (el) => el.id === action.payload.item.id
        );
        if (itemIndex == -1) {
          itemIndex = state.data["FoundData"].findIndex(
            (el) => el.id === action.payload.item.id
          );
          state.data["FoundData"][itemIndex] = { ...action.payload.data };
        } else {
          state.data["LostData"][itemIndex] = { ...action.payload.data };
        }
      });
  },
});

export const selectLostAndFound = (state) => state.lostandfound;

export default lostAndFoundSlice.reducer;
