import { Film, Person, Specie } from "@/lib/types";

export interface CardProps {
  isFav: boolean;
  handleUpdateFavourite: (
    item: Film | Person | Specie,
    isFavourite: boolean
  ) => Promise<void>;
}
