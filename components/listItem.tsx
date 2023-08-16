import { Data, Film, Person, Specie } from "@/lib/types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { Loader } from "./loader";
import { FilmCard, Header, PersonCard, SpecieCard } from "./molecules";

type ListItemProps = {
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
}: ListItemProps) => {
  console.log("🚀 ~ file: listItem.tsx:28 ~ total:", total);
  return (
    <div className="space-y-10">
      {error ? (
        <p>Failed get data...</p>
      ) : isLoading || isFetching ? (
        <Loader total={total} />
      ) : (
        <>
          <Header total={total} title={title} />
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
