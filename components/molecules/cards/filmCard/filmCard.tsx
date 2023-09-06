import { Film, Person, Specie } from "@/lib/types";

import { Favourite } from "../../../organisms/favourite/favourite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

export interface FilmCardProps {
  item: Film;
  isFav: boolean;
  handleUpdateFavourite: (
    item: Film | Person | Specie,
    isFavourite: boolean
  ) => Promise<void>;
}

/**
 * Film Card component
 *
 * @param {FilmCardProps} { film }
 * @returns {JSX.Element}
 */
export const FilmCard = ({
  item,
  isFav,
  handleUpdateFavourite,
}: FilmCardProps): JSX.Element => {
  const { title, episode_id, director, producer, release_date, url } = item;
  return (
    <Card className="w-[370px]">
      <CardHeader>
        <CardTitle className="flex justify-between gap-2">
          <span>{title}</span>
          <Favourite
            item={item}
            url={url}
            isFav={isFav}
            handleUpdateFavourite={handleUpdateFavourite}
          />
        </CardTitle>
        <CardDescription>{`Episode ${episode_id}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`Director: ${director}`}</p>
        <p>{`Producer: ${producer}`}</p>
        <p>{`Release: ${release_date}`}</p>
      </CardContent>
    </Card>
  );
};
