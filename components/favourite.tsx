import { addToFavourite } from "@/lib/redux/features/favouriteSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { HeartIcon } from "lucide-react";

type Favourite = {
  url: string;
};

export const Favourite = ({ url }: Favourite) => {
  const dispatch = useAppDispatch();

  const handleSaveToFavourite = (url: string) => {
    dispatch(addToFavourite(url));
  };

  return (
    <>
      <HeartIcon className="cursor-pointer" onClick={() => handleSaveToFavourite(url)} />
    </>
  );
};
