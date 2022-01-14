import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "../modules/feature/featureSlice";

export const store = configureStore({
  reducer: {
    feature: featureReducer,
  },
});
