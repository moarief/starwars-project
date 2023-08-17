import {
  removeFromFavourite,
  addToFavourite,
} from "@/lib/redux/features/favouriteSlice";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";

type UseFavouriteProps = {
  isFavourite: boolean;
  handleUpdateFavourite: () => any;
};

/**
 * Updates favourites depending on current global state
 *
 * @param {string} url
 * @returns {UseFavouriteProps}
 */
export const useFavourites = (url: string): UseFavouriteProps => {
  const favourites = useAppSelector(
    (state) => state.favouriteReducer.favourites
  );

  const dispatch = useAppDispatch();
  const isFavourite = favourites.includes(url);

  const handleUpdateFavourite = () =>
    isFavourite
      ? dispatch(removeFromFavourite(url))
      : dispatch(addToFavourite(url));

  return { isFavourite, handleUpdateFavourite };
};
