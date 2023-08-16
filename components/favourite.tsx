import {
  addToFavourite,
  removeFromFavourite,
} from "@/lib/redux/features/favouriteSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { HeartIcon } from "lucide-react";

type Favourite = {
  url: string;
};

export const Favourite = ({ url }: Favourite) => {
  const favourites = useAppSelector(
    (state) => state.favouriteReducer.favourites
  );

  const dispatch = useAppDispatch();
  const isFavourite = favourites.includes(url);

  const handleSaveToFavourite = () => {
    if (isFavourite) {
      dispatch(removeFromFavourite(url));
    } else {
      dispatch(addToFavourite(url));
    }
  };

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
