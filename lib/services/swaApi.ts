import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const swaApi = createApi({
  reducerPath: "swaApi",
  // refetchOnFocus: true,
  keepUnusedDataFor: 10 * 60,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SWA_API,
  }),
  endpoints: (builder) => ({
    getAll: builder.query<Data, typeof initQuery>({
      query: ({ category: id, page, keyword }) => {
        if (page && !keyword) {
          return `${id}?page=${page}`;
        } else if (keyword) {
          return `${id}?search=${keyword}`;
        } else {
          return `${id}`;
        }
      },
      transformResponse: (response: Data) => {
        const newResults = response.results.map(
          (item: Film | Person | Specie) => {
            if ("title" in item) {
              return Object.assign(item, { _type: "film" });
            } else if ("gender" in item) {
              return Object.assign(item, { _type: "person" });
            } else if ("classification" in item) {
              return Object.assign(item, { _type: "specie" });
            }
          }
        );

        const newResponse = Object.assign(response, { results: newResults });
        return newResponse;
      },
    }),
  }),
});

export const { useGetAllQuery } = swaApi;
