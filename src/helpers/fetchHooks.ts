import useSWR from "swr";
import { RawEntries } from "../models/movies";

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

export type ListType =
  | "now_playing"
  | "latest"
  | "popular"
  | "top_rated"
  | "upcoming";

type MovieListReq = {
  section?: ListType;
  language?: string;
  page?: number;
};

export const useMovieList = ({
  section = "popular",
  language,
  page = 1,
}: MovieListReq): MovieListRes => {
  const { data, error } = useSWR(
    `${API_URL}/movie/${section}?api_key=${API_KEY}${
      language ? `&language=${language}` : ""
    }&page=${page}`,
    fetcher
  );

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const useMovieData = () => {};

export const usePersonData = () => {};
