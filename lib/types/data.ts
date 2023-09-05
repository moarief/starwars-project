import * as z from "zod";
import { FilmSchema } from "./film";
import { PersonSchema } from "./person";
import { SpecieSchema } from "@/lib/types/specie";

export const DataSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(FilmSchema || PersonSchema || SpecieSchema),
});

export type Data = z.infer<typeof DataSchema>;

export enum DataTypes {
  FILM = "film",
  PERSON = "person",
  SPECIE = "specie",
}
