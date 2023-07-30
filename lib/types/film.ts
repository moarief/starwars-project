import * as z from "zod";

export const FilmSchema = z.object({
  title: z.string(),
  episode_id: z.number(),
  director: z.string(),
  opening_crawl: z.string(),
  release_date: z.string(),
  producer: z.string(),
  starships: z.array(z.string()),
  species: z.array(z.string()),
  characters: z.array(z.string()),
  vehicles: z.array(z.string()),
  planets: z.array(z.string()),
  url: z.string(),
  edited: z.string(),
  created: z.string(),
});

export type Film = z.infer<typeof FilmSchema>;
