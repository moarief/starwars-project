"use client";

import { ListItem } from "@/components/listItem";
import { useAppSelector } from "@/lib/redux/hooks";
import { useGetFavoritesQuery } from "@/lib/services/swaApi";
import { useState, useEffect } from "react";

export default function Page() {
  const favourites = useAppSelector(
    (state) => state.favouriteReducer.favourites
  );
  console.log("🚀 ~ file: page.tsx:8 ~ Page ~ favourites:", favourites);

  const [favoritesData, setFavoritesData] = useState<any | null>(null);
  console.log("🚀 ~ file: page.tsx:15 ~ Page ~ favoritesData:", favoritesData);

  const { isLoading, isFetching, data, error, isSuccess } =
    useGetFavoritesQuery(favourites);

  // Update the state variable when the data is fetched
  useEffect(() => {
    if (data) {
      setFavoritesData(data);
    }
  }, [data]);

  console.log("🚀 ~ file: page.tsx:14 ~ Page ~ isSuccess:", isSuccess);
  console.log("🚀 ~ file: page.tsx:14 ~ Page ~ data:", data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl justify-between font-mono text-sm lg:flex">
        {/* <ListItem
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          error={error}
          title={"Result"}
          total={0}
        /> */}
      </div>
    </main>
  );
}
