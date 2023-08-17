import { CardLoader, FilmCard, Header, PersonCard, SpecieCard } from '@/components/molecules';
import { Data, Film, Person, Specie } from '@/lib/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

type ListItemProps = {
  title: string;
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  data: Data;
  error: FetchBaseQueryError | SerializedError | undefined;
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
  isFetching,
}: ListItemProps): JSX.Element => {
  // TODO: Update error handling with a better message
  if (error) {
    return <p>Failed get data...</p>;
  }

  if (isLoading || isFetching) {
    return <CardLoader />;
  }

  return (
    <div className="space-y-10 w-full">
      <Header total={total} title={title} />
      <div className="flex flex-wrap flex-row justify-between gap-y-5">
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
    </div>
  );
};
