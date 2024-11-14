import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "../features/budgetSlice";

const store = configureStore({
  reducer: {
    budget: budgetReducer,
  },
});

export default store;
