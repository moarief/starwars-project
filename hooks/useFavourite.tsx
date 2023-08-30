import { redisClient } from "@/lib/services/redis";
import { Film, Person, Specie } from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetFavourite = () => {
  const [favourites, setFavourites] = useState<{
    data: (Film | Person | Specie)[];
    isLoading: boolean;
    isFetching: boolean;
  }>({
    data: [],
    isLoading: true,
    isFetching: true,
  });

  useEffect(() => {
    const getFavourite = async () => {
      const favouritesData: (Film | Person | Specie)[] =
        await redisClient.lrange("favouritesList", 0, -1);
      setFavourites({
        data: favouritesData,
        isLoading: false,
        isFetching: false,
      });
    };
    getFavourite();
  }, []);

  return {
    isLoading: favourites.isLoading,
    data: favourites.data,
    isFetching: favourites.isFetching,
  };
};
