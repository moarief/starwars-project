"use client";

import { CardList } from "@/components/organisms";
import { useGetFavourite } from "@/hooks/useFavourite";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Page() {
  // TODO: Maybe use context instead of redux for this

  const favouritess = useAppSelector(
    (state) => state.favouriteReducer.favourites
  );
  const { favourites, isLoading, data, isFetching, handleUpdateFavourite } =
    useGetFavourite(favouritess);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl justify-between font-mono text-sm lg:flex">
        <CardList
          isLoading={isLoading}
          isFetching={isFetching}
          favData={favourites}
          title={"Result"}
          total={data.length ?? 0}
          handleUpdateFavourite={handleUpdateFavourite}
        />
      </div>
    </main>
  );
}
