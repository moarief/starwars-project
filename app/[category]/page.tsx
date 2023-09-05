"use client";

import { CardList, Pagination } from "@/components/organisms";
import { useGetFavourite } from "@/hooks/useFavourite";
import { TypeQuery, useGetAllQuery } from "@/lib/services/swaApi";
import { Data } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

import { useAppSelector } from "@/lib/redux/hooks";

export type PageProps = {
  params: { category: string };
};

export default function Page({ params }: PageProps) {
  const favouritess = useAppSelector(
    (state) => state.favouriteReducer.favourites
  );

  const route = useRouter();
  const searchParams = useSearchParams();

  // Category type
  const { category } = params;

  // Get current page number
  const pageNumber = searchParams.get("page");

  // Get search keyword
  const searchKeywordParam = searchParams.get("keyword");

  // Query for the SWAPI search
  const query: TypeQuery = {
    category,
    page: pageNumber ? pageNumber : "",
    keyword: searchKeywordParam,
  };

  // Get data
  const { isLoading, isFetching, data, error } = useGetAllQuery(query);

  // Get favourites
  const { favourites, handleUpdateFavourite } = useGetFavourite(favouritess);

  // Data for the ListItem component
  const totalAmount = data?.count ? data.count : 0;
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  /**
   * Update current page number and set
   * @date 8/15/2023 - 8:29:20 PM
   *
   * @param {(string | null | undefined)} pageNumber
   */
  const handlePageNumber = (pageNumber: string | null | undefined) => {
    const number = pageNumber?.split("=").pop();
    route.push(`/${category}?page=${number}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <div className="flex flex-col space-y-10 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
        <CardList
          title={title}
          total={totalAmount}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data as Data}
          error={error}
          favData={favourites}
          handleUpdateFavourite={handleUpdateFavourite}
        />
        <Pagination
          data={data}
          totalAmount={totalAmount}
          handlePageNumber={handlePageNumber}
        />
      </div>
    </main>
  );
}
