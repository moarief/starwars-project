import { useFavourites } from "@/hooks/useFavourite";
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
export const Favourite = ({ url }: Favourite): JSX.Element => {
  const { isFavourite, handleUpdateFavourite } = useFavourites(url);

  return (
    <>
      <HeartIcon
        fill={isFavourite ? "white" : ""}
        className="cursor-pointer"
        onClick={() => handleUpdateFavourite()}
      />
    </>
  );
};
