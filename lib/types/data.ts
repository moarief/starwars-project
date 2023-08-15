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

// TODO: Figure out this shit with an ENUM!!
export enum CategoryType {
  FILMS = "film",
  PEOPLE = "people",
  SPECIES = "species",
}
