import { Data, Film, Person, Specie } from "@/lib/types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { Loader } from "./loader";
import { FilmCard, PersonCard, SpecieCard } from "./molecules";


type ListItem = {
  title: string;
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  data: Data;
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
              data.results.map((item: Film | Person | Specie) => {
                if ("title" in item) {
                  return <FilmCard key={item.episode_id} film={item} />;
                } else if ("gender" in item) {
                  return <PersonCard key={item.name} person={item} />;
                } else if ("classification" in item) {
                  return <SpecieCard key={item.name} specie={item} />;
                }
              })}
          </div>
        </>
      )}
    </div>
  );
};
