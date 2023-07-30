"use client";

import { ListItem } from "@/components/listItem";
import { useGetSearchQuery } from "@/lib/services/swaApi";
import { useSearchParams } from "next/navigation";

export type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const searchParams = useSearchParams();
  const { id } = params;
  const type = searchParams.get("type");

  const query = { type: type, keyword: id };

  const { isLoading, isFetching, data, error } = useGetSearchQuery(query);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl justify-between font-mono text-sm lg:flex">
        <ListItem
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          error={error}
          title={"Result"}
          total={data?.count ? data.count : 0}
        />
      </div>
    </main>
  );
}
