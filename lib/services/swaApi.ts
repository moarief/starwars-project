import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Data, Film, Person, Specie } from "../types";

type TypeQuery = {
  id: string;
  page: string;
};

const initQuery: TypeQuery = {
  id: "films",
  page: "",
};

type BatchData = {
  results: (Film | Person | Specie)[];
};

type BaseQueryDataType = {
  data: Film | Person | Specie;
  error: FetchBaseQueryError | null;
  meta: FetchBaseQueryMeta;
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
    // Define an endpoint that takes an array of endpoints as an argument
    batchFetch: builder.query({
      // Use queryFn to write custom logic
      queryFn: async (arg, _queryApi, _extraOptions, baseQuery) => {
        // Assume arg is an array of endpoints, such as ['posts', 'users', 'comments']
        // Create an array of promises for each endpoint
        const promises = arg.map((endpoint: string) => baseQuery(endpoint));
        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        console.log("🚀 ~ file: swaApi.ts:47 ~ queryFn: ~ results:", results);

        const favouriteArray = results.map((result) => {
          return result.data ? (result.data as Film) : [];
        });

        // Return the results as an array
        return {
          data: {
            results: favouriteArray,
          },
        };
      },
    }),
  }),
});

export const { useGetTypeQuery, useGetSearchQuery, useBatchFetchQuery } =
  swaApi;
