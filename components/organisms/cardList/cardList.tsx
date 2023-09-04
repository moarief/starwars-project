import {
  CardLoader,
  FilmCard,
  Header,
  PersonCard,
  SpecieCard,
} from "@/components/molecules";
import { Data, DataTypes, Film, Person, Specie } from "@/lib/types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type ListItemProps = {
  title: string;
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  data?: Data;
  favData?: (Film | Person | Specie)[];
  error?: FetchBaseQueryError | SerializedError | undefined;
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
          {data.results ? <List list={data.results} /> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full">
      <Header total={total} title={title} />
      <div className="flex flex-wrap flex-row justify-between gap-y-5">
        {favData ? <List list={favData} /> : null}
      </div>
    </div>
  );
};

type ListProps = {
  list: (Film | Person | Specie)[];
};

const List = ({ list }: ListProps) => {
  return (
    <>
      {list.map((item: Film | Person | Specie) => {
        if ((item as Film) && item._type === DataTypes.FILM) {
          return (
            <FilmCard key={(item as Film).episode_id} film={item as Film} />
          );
        } else if ((item as Person) && item._type === DataTypes.PERSON) {
          return (
            <PersonCard key={(item as Person).name} person={item as Person} />
          );
        } else if ((item as Specie) && item._type === DataTypes.SPECIE) {
          return (
            <SpecieCard key={(item as Specie).name} specie={item as Specie} />
          );
        }
      })}
    </>
  );
};
