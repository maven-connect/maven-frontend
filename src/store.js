import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profileSlice";
import groupReducer from "./features/groupSlice";
import messageReducer from "./features/messageSlice";
import groupParticipantsReducer from "./features/groupParticipantsSlice";
import lostandfoundReducer from "./features/lostAndFoundSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      profile: profileReducer,
      group: groupReducer,
      message: messageReducer,
      groupParticipants: groupParticipantsReducer,
      lostandfound: lostandfoundReducer,
    },
  });
}

const store = makeStore();

export default store;
