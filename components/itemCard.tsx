import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Film } from "@/lib/types/film";
import { Person } from "@/lib/types/person";
import { Specie } from "@/lib/types/specie";
import { Favourite } from "./favourite";

type Props = Film | Person | Specie;

export const ItemCard = (item: Props) => {
  if ("title" in item) {
    const { title, episode_id, director, producer, release_date, url } = item;
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
  } else if ("gender" in item) {
    const { name, gender, height, hair_color, films, url } = item;
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-between gap-2">
            <span>{name}</span>
            <Favourite url={url} />
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
  } else if ("classification" in item) {
    const { name, classification, designation, language, url, films } = item;
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-between gap-2">
            <span>{name}</span>
            <Favourite url={url} />
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
  }
};
