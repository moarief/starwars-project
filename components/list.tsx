"use client";

import { useGetTypeQuery } from "@/lib/services/swaApi";
import { ListItem } from "./listItem";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

type List = {
  category: string;
};

type PageNumber = string;

/**
 * A functional component that renders a list of items based on the provided category.
 * @param {List} category - The category of items to display.
 * @returns JSX elements representing the list of items.
 */
export const List = ({ category }: List) => {
  const [pageNumber, setPageNumber] = useState<PageNumber>();

  const { isLoading, isFetching, data, error } = useGetTypeQuery({
    id: category,
    page: pageNumber ? pageNumber : "",
  });

  /**
   * Reset pageNumber on category change
   * as Films do not have multiple pages
   */
  useEffect(() => {
    setPageNumber("");
  }, [category]);

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  const handlePageNumber = (pageNumber: string | null | undefined) => {
    const number = pageNumber?.split("=").pop();
    setPageNumber(number);
  };

  const totalAmount = data?.count ? data.count : 0;
  const maxPageNumber = Math.ceil(totalAmount / 10).toString();

  return (
    <div className="flex w-full flex-col mb-20">
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
  );
};
