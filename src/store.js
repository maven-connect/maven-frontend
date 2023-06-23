import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  return configureStore({
    reducer: {},
  });
}

const store = makeStore();

export default store;
