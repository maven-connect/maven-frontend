import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profileSlice";
import groupReducer from "./features/groupSlice";
import messageReducer from "./features/messageSlice";
import groupParticipantsReducer from "./features/groupParticipantsSlice";
export function makeStore() {
  return configureStore({
    reducer: {
      profile: profileReducer,
      group: groupReducer,
      message: messageReducer,
      groupParticipants: groupParticipantsReducer,
    },
  });
}

const store = makeStore();

export default store;
