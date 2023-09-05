import { createSlice } from "@reduxjs/toolkit";

type FavouriteState = {
  favourites: boolean;
};

const initialState = {
  favourites: false,
} as FavouriteState;

export const favourites = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    reset: () => initialState,
    updateFavourites: (state) => {
      state.favourites = !state.favourites;
    },
  },
});

export const { updateFavourites, reset } = favourites.actions;
export default favourites.reducer;
