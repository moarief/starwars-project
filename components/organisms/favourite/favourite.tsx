import { useGetFavourite } from "@/hooks/useFavourite";
import { redisClient } from "@/lib/services/redis";
import { Film, Person, Specie } from "@/lib/types";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Favourite = {
  url?: string;
  item: Film | Person | Specie;
};

/**
 * Favourite component
 *
 * @param {Favourite} { url }
 * @returns {*}
 */
export const Favourite = ({ url, item }: Favourite): JSX.Element => {
  const [isFavourite, setisFavourite] = useState<boolean>(false);

  const { isLoading, data, isFetching } = useGetFavourite();

  useEffect(() => {
    if (!isLoading && !isFetching && data) {
      const exists = data.find(
        (el: Film | Person | Specie) => item.url === el.url
      );

      exists ? setisFavourite(true) : setisFavourite(false);
    }
  }, [data, isLoading, isFetching, item]);

  const handleUpdateFavourite = async () => {
    if (isFavourite) {
      await redisClient.lrem("favouritesList", 1, item);
      setisFavourite(false);
    } else {
      await redisClient.lpush("favouritesList", item);
      setisFavourite(true);
    }
  };

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
