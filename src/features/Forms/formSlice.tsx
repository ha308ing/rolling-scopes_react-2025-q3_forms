import { createSlice } from "@reduxjs/toolkit";
import type { IForm } from "./schema";
import type { RootState } from "../../store";

const initialState: IForm & { lastUpdated: string[] } = {
  age: undefined,
  country: undefined,
  email: undefined,
  gender: undefined,
  name: undefined,
  password: undefined,
  password_confirm: undefined,
  picture: undefined,
  toc: undefined,
  lastUpdated: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    write: (state, action) => {
      const keys = Object.keys(action.payload).filter(
        (key) => state[key as keyof IForm] != action.payload[key],
      );
      return {
        ...initialState,
        toc: false,
        ...action.payload,
        lastUpdated: [...keys],
      };
    },
  },
});

export const { write } = formSlice.actions;

export const selectForm = (state: RootState) => state.form;
