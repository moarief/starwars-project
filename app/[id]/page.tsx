"use client";

import { List } from "@/components/listOld";
import { ListItem } from "@/components/listItem";
import { TypeQuery, useGetAllQuery, useGetSearchQuery, useGetTypeQuery } from "@/lib/services/swaApi";
import { useSearchParams } from "next/navigation";

export type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const searchParams = useSearchParams();
  const { id } = params;
  console.log("🚀 ~ file: page.tsx:15 ~ Page ~ id:", id)

  // Get category
  const searchKeyword = searchParams.get("keyword");
  console.log("🚀 ~ file: page.tsx:18 ~ Page ~ category:", searchKeyword)

  // Query for the SWAPI search
  const query: TypeQuery = { id, page: "",  type: id, keyword: searchKeyword };

  // Get data
  // const { isLoading, isFetching, data, error } = useGetSearchQuery(query);
  const { isLoading, isFetching, data, error } = useGetAllQuery(query);

  // Number of items
  const searchResult = data?.results.length ? data?.results.length : 0;

  const title = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
        <ListItem
          title={title}
          total={data?.count ? data.count : 0}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          error={error}
        />
      </div>
    </main>
  );
}
