import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Data } from "../types";

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
    }),
  }),
});

export const { useGetAllQuery } = swaApi;
