import { Favourite } from '@/components/organisms/favourite/favourite';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Person } from '@/lib/types';

import { CardProps } from '../types';

export interface PersonCardProps extends CardProps {
  item: Person;
}

/**
 * Person Card component
 *
 * @param {PersonCardProps} { person }
 * @returns {JSX.Element}
 */
export const PersonCard = ({
  item,
  isFav,
  handleUpdateFavourite,
}: PersonCardProps): JSX.Element => {
  const { name, gender, height, hair_color, films, url } = item;
  return (
    <Card className="w-[370px]">
      <CardHeader>
        <CardTitle className="flex justify-between gap-2">
          <span>{name}</span>
          <Favourite
            item={item}
            url={url}
            isFav={isFav}
            handleUpdateFavourite={handleUpdateFavourite}
          />
        </CardTitle>
        <CardDescription>
          <span>In episode </span>
          {films.map((item: string, index: number) => {
            const film = item.split("/");
            const filmNumber = film.at(film.length - 2);
            const isLastElement = index === films.length - 1;
            return (
              <span key={item}>{`${filmNumber}${
                isLastElement ? "" : ", "
              }`}</span>
            );
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`Gender: ${gender}`}</p>
        <p>{`Height: ${height}`}</p>
        <p>{`Hair color: ${hair_color}`}</p>
      </CardContent>
    </Card>
  );
};
