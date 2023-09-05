import { Film, Person, Specie } from "@/lib/types";
import { HeartIcon } from "lucide-react";

type Favourite = {
  url?: string;
  item: Film | Person | Specie;
  // favData: GetFavourites;
  isFav: boolean;
  handleUpdateFavourite: (
    item: Film | Person | Specie,
    isFavourite: boolean
  ) => Promise<void>;
};

/**
 * Favourite component
 *
 * @param {Favourite} { url }
 * @returns {*}
 */
export const Favourite = ({
  item,
  isFav,

  handleUpdateFavourite,
}: Favourite): JSX.Element => {
  return (
    <>
      <HeartIcon
        fill={isFav ? "white" : ""}
        className="cursor-pointer"
        onClick={() => handleUpdateFavourite(item, isFav)}
      />
    </>
  );
};
