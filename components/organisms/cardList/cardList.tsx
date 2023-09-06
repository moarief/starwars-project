import {
  CardLoader,
  FilmCard,
  FilmCardProps,
  Header,
  PersonCard,
  PersonCardProps,
  SpecieCard,
  SpecieCardProps,
} from "@/components/molecules";
import { GetFavourites } from "@/hooks/useFavourite";
import { Data, Film, Person, Specie } from "@/lib/types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type ListItemProps = {
  title: string;
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  data?: Data;
  favData: GetFavourites;
  error?: FetchBaseQueryError | SerializedError | undefined;
  handleUpdateFavourite: (
    item: Film | Person | Specie,
    isFavourite: boolean
  ) => Promise<void>;
};

/**
 * List Item component
 *
 * @param {ListItemProps} {
  title,
  total,
  error,
  isLoading,
  data,
  isFetching,
}
 * @returns {JSX.Element}
 */
export const CardList = ({
  title,
  total,
  error,
  isLoading,
  data,
  favData,
  isFetching,
  handleUpdateFavourite,
}: ListItemProps): JSX.Element => {
  // TODO: Update error handling with a better message
  if (error) {
    return <p>Failed get data...</p>;
  }

  if (isLoading || isFetching) {
    return <CardLoader />;
  }

  if (data) {
    return (
      <div className="space-y-10 w-full">
        <Header total={total} title={title} />
        <div className="flex flex-wrap flex-row justify-between gap-y-5">
          {data.results ? (
            <List
              list={data.results}
              favourites={favData}
              handleUpdateFavourite={handleUpdateFavourite}
            />
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full">
      <Header total={total} title={title} />
      <div className="flex flex-wrap flex-row justify-between gap-y-5">
        {favData ? (
          <List
            list={favData.data}
            favourites={favData}
            handleUpdateFavourite={handleUpdateFavourite}
          />
        ) : null}
      </div>
    </div>
  );
};

type ListProps = {
  list: (Film | Person | Specie)[];
  favourites: GetFavourites;
  handleUpdateFavourite: (
    item: Film | Person | Specie,
    isFavourite: boolean
  ) => Promise<void>;
};

interface Views {
  film: ({ item, isFav, handleUpdateFavourite }: FilmCardProps) => JSX.Element;
  person: ({
    item,
    isFav,
    handleUpdateFavourite,
  }: PersonCardProps) => JSX.Element;
  specie: ({ item, isFav }: SpecieCardProps) => JSX.Element;
}

const views: Views = {
  film: FilmCard,
  person: PersonCard,
  specie: SpecieCard,
};

const List = ({ list, favourites, handleUpdateFavourite }: ListProps) => {
  const { isLoading, isFetching, data } = favourites;
  return (
    <>
      {list.map((item: Film | Person | Specie) => {
        let exists;

        const CurrentView = views[item._type as keyof Views];

        if (!isLoading && !isFetching && data) {
          exists = data.find(
            (el: Film | Person | Specie) => item.url === el.url
          );
        }

        return (
          <div key={item.url}>
            {CurrentView && (
              <CurrentView
                item={item as any}
                isFav={exists !== undefined}
                handleUpdateFavourite={handleUpdateFavourite}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
