import * as z from "zod";

export const SpecieSchema = z.object({
  name: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  classification: z.string(),
  designation: z.string(),
  average_height: z.string(),
  average_lifespan: z.string(),
  language: z.string(),
  homeworld: z.string(),
  people: z.array(z.string()),
  films: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export type Specie = z.infer<typeof SpecieSchema>;
