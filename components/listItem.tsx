import { Film, Person, Specie } from "@/lib/types";

import { ItemCard } from "./itemCard";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Loader } from "./loader";

type ListItem = {
  title: string;
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  data: any; // Data??
  error: FetchBaseQueryError | SerializedError | undefined;
};

export const ListItem = ({
  title,
  total,
  error,
  isLoading,
  data,
  isFetching,
}: ListItem) => {
  return (
    <div className="space-y-10">
      {error ? (
        <p>Failed get data...</p>
      ) : isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            <span>
              {total ? total : null} {title}
            </span>
          </h2>
          <div className="flex flex-wrap justify-between gap-y-5">
            {data &&
              data.results.length > 0 &&
              data.results.map((item: Film | Person | Specie) => {
                if ("name" in item) {
                  return <ItemCard key={item.name} {...item} />;
                }
                if ("title" in item) {
                  return <ItemCard key={item.episode_id} {...item} />;
                }
              })}
          </div>
        </>
      )}
    </div>
  );
};
