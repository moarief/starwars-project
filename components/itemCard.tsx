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

type Props = Film | Person | Specie;

export const ItemCard = (item: Props) => {
  if ("title" in item) {
    const { title, episode_id, director, producer, release_date, url } = item;
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
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
    const { name, homeworld, gender, height, hair_color, url } = item;
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{`Episode ${homeworld}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`Director: ${gender}`}</p>
          <p>{`Producer: ${height}`}</p>
          <p>{`Release: ${hair_color}`}</p>
        </CardContent>
      </Card>
    );
  } else if ("classification" in item) {
    const { name, homeworld, classification, designation, language, url } =
      item;
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{`Episode ${homeworld}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`Director: ${classification}`}</p>
          <p>{`Producer: ${designation}`}</p>
          <p>{`Release: ${language}`}</p>
        </CardContent>
      </Card>
    );
  }
};
