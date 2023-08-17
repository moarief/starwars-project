import {
  addToFavourite,
  removeFromFavourite,
} from "@/lib/redux/features/favouriteSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { HeartIcon } from "lucide-react";

type Favourite = {
  url: string;
};


/**
 * Favourite component
 *
 * @param {Favourite} { url }
 * @returns {*}
 */
export const Favourite = ({ url }: Favourite) => {
  const favourites = useAppSelector(
    (state) => state.favouriteReducer.favourites
  );

  const dispatch = useAppDispatch();
  const isFavourite = favourites.includes(url);

  const handleSaveToFavourite = () =>
    isFavourite
      ? dispatch(removeFromFavourite(url))
      : dispatch(addToFavourite(url));

  return (
    <>
      <HeartIcon
        fill={isFavourite ? "white" : ""}
        className="cursor-pointer"
        onClick={() => handleSaveToFavourite()}
      />
    </>
  );
};
