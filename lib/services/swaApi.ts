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
  reducerPath: "userApi",
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
  }),
});

export const { useGetTypeQuery } = swaApi;
