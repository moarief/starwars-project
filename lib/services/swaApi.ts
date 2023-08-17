import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

import { Data, Film, Person, Specie } from "../types";

export type TypeQuery = {
  category: string;
  page: string;
  keyword: string | null;
};

const initQuery: TypeQuery = {
  category: "films",
  page: "",
  keyword: "",
};

type BatchData = {
  results: (Film | Person | Specie)[];
};

type BaseQueryDataType = {
  data: BatchData;
  error: FetchBaseQueryError | null;
  meta: FetchBaseQueryMeta;
};

export const swaApi = createApi({
  reducerPath: "swaApi",
  // refetchOnFocus: true,
  keepUnusedDataFor: 10 * 60,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (builder) => ({
    getAll: builder.query<Data, typeof initQuery>({
      query: ({ category: id, page, keyword }) => {
        if (page && !keyword) {
          return `${id}?page=${page}`;
        } else if (keyword && page) {
          return `${id}?search=${keyword}`;
        } else {
          return `${id}`;
        }
      },
    }),
    // Define an endpoint that takes an array of endpoints as an argument // baseQuery: (arg: string | FetchArgs)
    batchFetch: builder.query({
      // Use queryFn to write custom logic
      queryFn: async (arg, _queryApi, _extraOptions, baseQuery) => {
        // Assume arg is an array of endpoints, such as ['posts', 'users', 'comments']
        // Create an array of promises for each endpoint
        const promises = arg.map((endpoint: string) => baseQuery(endpoint));

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        const merged: (Film | Person | Specie)[] = [].concat(
          ...results.map((result) => result.data)
        );

        // Return the results as an array
        return {
          data: {
            results: merged,
          },
        };
      },
    }),
  }),
});

export const { useBatchFetchQuery, useGetAllQuery } = swaApi;
