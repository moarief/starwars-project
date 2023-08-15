import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Data, Film, Person, Specie } from "../types";

export type TypeQuery = {
  id: string;
  page: string;
  // type: string | null;
  keyword: string | null;
};

const initQuery: TypeQuery = {
  id: "films",
  page: "",
  // type: null,
  keyword: "",
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
  keepUnusedDataFor: 10 * 60,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (builder) => ({
    getAll: builder.query<Data, typeof initQuery>({
      query: ({ id, page, keyword }) => {
        if (page) {
          return `${id}?page=${page}`;
        } else if (keyword) {
          return `${id}?search=${keyword}`;
        } else {
          return `${id}`;
        }
      },
    }),
    getType: builder.query<Data, typeof initQuery>({
      query: ({ id, page }) => {
        if (page) {
          return `${id}?page=${page}`;
        } else {
          return `${id}`;
        }
      },
    }),
    getSearch: builder.query<Data, { type: string; keyword: string | null }>({
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

export const {
  useGetTypeQuery,
  useGetSearchQuery,
  useBatchFetchQuery,
  useGetAllQuery,
} = swaApi;
