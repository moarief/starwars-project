import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavouriteState = {
  favourites: string[];
};

const initialState = {
  favourites: [],
} as FavouriteState;

export const favourites = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    reset: () => initialState,
    addToFavourite: (state, action: PayloadAction<string>) => {
      state.favourites.push(action.payload);
    },
    removeFromFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter((item) => item === action.payload);
    },
  },
});

export const { addToFavourite, removeFromFavourite, reset } = favourites.actions;
export default favourites.reducer;
