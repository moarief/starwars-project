import * as z from "zod";

export const PersonSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.string(),
  starships: z.array(z.string()),
  species: z.array(z.string()),
  films: z.array(z.string()),
  vehicles: z.array(z.string()),
  planets: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export type Person = z.infer<typeof PersonSchema>;
