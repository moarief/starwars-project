import {
  FilmCardProps,
  PersonCardProps,
  SpecieCardProps,
  FilmCard,
  PersonCard,
  SpecieCard,
} from "@/components/molecules";
import { GetFavourites } from "@/hooks/useFavourite";
import { Film, Person, Specie } from "@/lib/types";

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
} as const;

/**
 * Description placeholder
 * @date 9/6/2023 - 9:57:32 PM
 *
 * @param {ListProps} { list, favourites, handleUpdateFavourite }
 * @returns {*}
 */
export const List = ({
  list,
  favourites,
  handleUpdateFavourite,
}: ListProps): JSX.Element => {
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
