"use client";

import { CardList } from "@/components/organisms";
import { useGetFavourite } from "@/hooks/useFavourite";

export default function Page() {
  const { isLoading, data, isFetching } = useGetFavourite();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl justify-between font-mono text-sm lg:flex">
        <CardList
          isLoading={isLoading}
          isFetching={isFetching}
          favData={data}
          title={"Result"}
          total={data.length ?? 0}
        />
      </div>
    </main>
  );
}
