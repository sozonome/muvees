import useSWR from "swr";
import { MovieDetailType, RawEntries } from "../models/movies";

import { fetcher } from "./fetcher";

const API_URL = `https://api.themoviedb.org/3`;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type SWRHookResp = {
  isLoading: boolean;
  isError: any;
};

type MovieListRes = SWRHookResp & {
  data: RawEntries;
};

export type ListType = "now_playing" | "popular" | "top_rated" | "upcoming";

type MovieListReq = {
  section?: ListType;
  language?: string;
  page?: number;
  query?: string;
  shouldFetch?: boolean;
};

export const useMovieList = ({
  section = "popular",
  language,
  page = 1,
  query,
  shouldFetch,
}: MovieListReq): MovieListRes => {
  const endpoint = `${API_URL}${query ? "/search" : ""}/movie${
    query ? "" : `/${section}`
  }?api_key=${API_KEY}${language ? `&language=${language}` : ""}${
    query ? `&query=${query}` : ""
  }&page=${page}`;

  const { data, error } = useSWR(
    shouldFetch ? (shouldFetch === true ? endpoint : null) : endpoint,
    fetcher
  );

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

type MovieDetailReq = {
  id: number;
  language?: string;
};

type MovieDetailRes = SWRHookResp & {
  data: MovieDetailType;
};

export const useMovieData = ({ id }: MovieDetailReq): MovieDetailRes => {
  const { data, error } = useSWR(`${API_URL}/movie/${id}?api_key=${API_KEY}`);

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePersonData = () => {};
