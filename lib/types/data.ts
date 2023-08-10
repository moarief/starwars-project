import * as z from "zod";
import { FilmSchema } from "./film";
import { PersonSchema } from "./person";
import { SpecieSchema } from "@/lib/types/specie";

export const DataTypeObjectSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export type DataTypeObject = z.infer<typeof DataTypeObjectSchema>;

export const DataTypeSchema = z.tuple([DataTypeObjectSchema, DataTypeObjectSchema, DataTypeObjectSchema]);
export type DataTypes = z.infer<typeof DataTypeSchema>;

export const SWADataTypes: DataTypes = [
  {
    id: "films",
    title: "Films",
  },
  {
    id: "people",
    title: "People",
  },
  {
    id: "species",
    title: "Species",
  },
];

export const DataSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(FilmSchema || PersonSchema || SpecieSchema),
});

export type Data = z.infer<typeof DataSchema>;


export enum CategoryType {
  FILMS = "film",
  PEOPLE = "people",
  SPECIES = "species" 
}