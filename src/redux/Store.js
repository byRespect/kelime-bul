import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./Game";
export default configureStore({
  reducer: {
    Game: GameReducer,
  },
});
