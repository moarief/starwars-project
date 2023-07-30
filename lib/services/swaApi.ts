import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, Film } from "../types";

type TypeQuery = {
  id: string;
  page: string;
};

const initQuery: TypeQuery = {
  id: "films",
  page: "",
};

export const swaApi = createApi({
  reducerPath: "swaApi",
  // refetchOnFocus: true,
  // keepUnusedDataFor: 30,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (builder) => ({
    getType: builder.query<Data, typeof initQuery>({
      query: ({ id, page }) => {
        if (page) {
          return `${id}?page=${page}`;
        } else {
          return `${id}`;
        }
      },
    }),
    getSearch: builder.query<Data, { type: string | null; keyword: string }>({
      query: ({ type, keyword }) => `${type}?search=${keyword}`,
    }),
    getFavorites: builder.query<Film[], string[]>({
      async queryFn(favouriteUrls, _queryApi, _extraOptions, fetchWithBQ) {
        const favoriteRequests = favouriteUrls.map((url) => fetchWithBQ(url));
        const results = await Promise.all(favoriteRequests);
        console.log("🚀 ~ file: swaApi.ts:42 ~ queryFn ~ results:", results);

        const favorites: any = results.map((result) =>
          result.data ? (result.data as Film) : []
        );

        const favouriteArray = results.map((result) => {
          return result.data ? (result.data as Film) : [];
        });
        console.log(
          "🚀 ~ file: swaApi.ts:48 ~ favouriteArray ~ favouriteArray:",
          favouriteArray
        );

        // TODO: Does work correctly on the page, data is undefined.. no more time left..

        return favorites;
      },
    }),
  }),
});

export const { useGetTypeQuery, useGetSearchQuery, useGetFavoritesQuery } =
  swaApi;
