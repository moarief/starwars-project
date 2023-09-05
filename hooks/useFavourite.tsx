import { updateFavourites } from "@/lib/redux/features/favouriteSlice";
import { redisClient } from "@/lib/services/redis";
import { Film, Person, Specie } from "@/lib/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export type GetFavourites = {
  data: (Film | Person | Specie)[];
  isLoading: boolean;
  isFetching: boolean;
};

export const useGetFavourite = (update: boolean) => {
  const dispatch = useDispatch();

  const [favourites, setFavourites] = useState<GetFavourites>({
    data: [],
    isLoading: true,
    isFetching: true,
  });

  const handleUpdateFavourite = async (
    item: Film | Person | Specie,
    isFavourite: boolean
  ) => {
    if (isFavourite) {
      await redisClient.lrem("favouritesList", 1, item);
      dispatch(updateFavourites());
    } else {
      await redisClient.lpush("favouritesList", item);
      dispatch(updateFavourites());
    }
  };

  const getFavourite = async () => {
    const favouritesData: (Film | Person | Specie)[] = await redisClient.lrange(
      "favouritesList",
      0,
      -1
    );
    setFavourites({
      data: favouritesData,
      isLoading: false,
      isFetching: false,
    });
  };
  useEffect(() => {
    getFavourite();
  }, [update]);

  return {
    favourites,
    isLoading: favourites.isLoading,
    data: favourites.data,
    isFetching: favourites.isFetching,
    handleUpdateFavourite,
  };
};
