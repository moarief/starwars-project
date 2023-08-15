import * as z from "zod";

export const NavigationItemSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export type NavigationItem = z.infer<typeof NavigationItemSchema>;

export const NavigationSchema = z.tuple([
  NavigationItemSchema,
  NavigationItemSchema,
  NavigationItemSchema,
  NavigationItemSchema,
]);
export type Navigation = z.infer<typeof NavigationSchema>;

export const NavigationList: Navigation = [
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
  {
    id: "favourite",
    title: "Favourite",
  },
];
