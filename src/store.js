import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./features/profileSlice";
import groupReducer from "./features/groupSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      profile: profileReducer,
      group: groupReducer,
    },
  });
}

const store = makeStore();

export default store;
