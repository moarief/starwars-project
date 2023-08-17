import { Film } from "@/lib/types";

import { Favourite } from "../../../organisms/favourite/favourite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

interface FilmCardProps {
  film: Film;
}

/**
 * Film Card component
 *
 * @param {FilmCardProps} { film }
 * @returns {JSX.Element}
 */
export const FilmCard = ({ film }: FilmCardProps): JSX.Element => {
  const { title, episode_id, director, producer, release_date, url } = film;
  return (
    <Card className="w-[370px]">
      <CardHeader>
        <CardTitle className="flex justify-between gap-2">
          <span>{title}</span>
          <Favourite url={url} />
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
