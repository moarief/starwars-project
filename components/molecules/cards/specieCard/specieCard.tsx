import { Favourite } from "@/components/organisms/favourite/favourite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Specie } from "@/lib/types";

interface SpecieCardProps {
  specie: Specie;
  isFav: boolean;
}

/**
 * Specie Card component
 *
 * @param {SpecieCardProps} { specie }
 * @returns {JSX.Element}
 */
export const SpecieCard = ({ specie, isFav }: SpecieCardProps): JSX.Element => {
  const { name, classification, designation, language, url, films } = specie;
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex justify-between gap-2">
          <span>{name}</span>
          <Favourite item={specie} url={url} isFav={isFav} />
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
        <p>{`Classification: ${classification}`}</p>
        <p>{`Designation: ${designation}`}</p>
        <p>{`Language: ${language}`}</p>
      </CardContent>
    </Card>
  );
};
