import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
  value: string;
};

const initialState = {
  value: "films",
} as CategoryState;

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: () => initialState,
    update: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const {
  update,
  reset,
} = category.actions;
export default category.reducer;
