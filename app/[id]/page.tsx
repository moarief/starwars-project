"use client";

import { ListItem } from "@/components/listItem";
import { Button } from "@/components/ui/button";
import {
  TypeQuery,
  useGetAllQuery,
} from "@/lib/services/swaApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type PageProps = {
  params: { id: string };
};

type PageNumber = string;

export default function Page({ params }: PageProps) {
  const route = useRouter();
  const searchParams = useSearchParams();
  const { id } = params;

  // Get category
  const searchKeyword = searchParams.get("keyword");

  // Pagination
  const [pageNumber, setPageNumber] = useState<PageNumber>();

  // Query for the SWAPI search
  const query: TypeQuery = {
    id,
    page: pageNumber ? pageNumber : "",
    keyword: searchKeyword,
  };

  // Get data
  const { isLoading, isFetching, data, error } = useGetAllQuery(query);

  // Data for the ListItem component
  // TODO:- Could make this as a custom hook!
  const totalAmount = data?.count ? data.count : 0;
  const title = id.charAt(0).toUpperCase() + id.slice(1);

  /**
   * Reset pageNumber on category change
   * as Films do not have multiple pages
   */
  useEffect(() => {
    setPageNumber("");
  }, [id]);

  const handlePageNumber = (pageNumber: string | null | undefined) => {
    const number = pageNumber?.split("=").pop();
    route.push(`/${id}?page=${number}`);
    setPageNumber(number);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
        <ListItem
          title={title}
          total={totalAmount}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          error={error}
        />

        {totalAmount >= 10 ? (
          <div className="flex justify-center gap-5 mt-9">
            <Button
              disabled={data?.previous == null}
              onClick={() => handlePageNumber(data?.previous)}
              type="submit"
              variant={"default"}
            >
              Previous
            </Button>
            <Button
              disabled={data?.next == null}
              onClick={() => handlePageNumber(data?.next)}
              type="submit"
              variant={"default"}
            >
              Next
            </Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
