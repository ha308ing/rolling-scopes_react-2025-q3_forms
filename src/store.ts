import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "./features/Forms/formSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [formSlice.reducerPath]: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
