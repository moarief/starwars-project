"use client";

import { CardList } from "@/components/organisms";
import { useAppSelector } from "@/lib/redux/hooks";
import { useBatchFetchQuery } from "@/lib/services/swaApi";
import { Data } from "@/lib/types";

export default function Page() {
  const favourites = useAppSelector(
    (state) => state.favouriteReducer.favourites
  );

  const { isLoading, isFetching, data, error } = useBatchFetchQuery(favourites);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl justify-between font-mono text-sm lg:flex">
        <CardList
          isLoading={isLoading}
          isFetching={isFetching}
          data={data as Data}
          error={error}
          title={"Result"}
          total={data?.results.length ?? 0}
        />
      </div>
    </main>
  );
}
