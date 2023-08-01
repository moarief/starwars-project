"use client";

import { ListItem } from "@/components/listItem";
import { useGetSearchQuery } from "@/lib/services/swaApi";
import { useSearchParams } from "next/navigation";

export type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { id } = params;

  const query = { type: type, keyword: id };

  const { isLoading, isFetching, data, error } = useGetSearchQuery(query);

  const searchResult = data?.results.length ? data?.results.length : 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl justify-between font-mono text-sm lg:flex">
        {searchResult > 0 ? (
          <ListItem
            isLoading={isLoading}
            isFetching={isFetching}
            data={data}
            error={error}
            title={"Result"}
            total={data?.count ? data.count : 0}
          />
        ) : (
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            <span>Nothing found. Please try again.</span>
          </h2>
        )}
      </div>
    </main>
  );
}
