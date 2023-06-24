import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './features/profileSlice';
export function makeStore() {
  return configureStore({
    reducer: {
      profile: profileReducer,
    },
  });
}

const store = makeStore();

export default store;
