"use client";

import { List } from "@/components/listOld";
import { ListItem } from "@/components/listItem";
import { useGetSearchQuery, useGetTypeQuery } from "@/lib/services/swaApi";
import { useSearchParams } from "next/navigation";

export type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { id } = params;

  const { isLoading, isFetching, data, error } = useGetTypeQuery({
    id,
    page: page ?? "1",
  });

  const title = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
        <ListItem
          title={title}
          total={0}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          error={error}
        />
      </div>
    </main>
  );
}
