import useSWR from "swr";
import {
  MovieCreditsType,
  MovieDetailType,
  MovieImagesType,
  PersonDetailType,
  RawMovieListEntries,
} from "../models/movies";

import { fetcher } from "./fetcher";

const API_URL = `https://api.themoviedb.org/3`;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type SWRHookResp = {
  isLoading: boolean;
  isError: any;
};

type MovieListRes = SWRHookResp & {
  data: RawMovieListEntries;
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
  const { data, error } = useSWR(
    `${API_URL}/movie/${id}?api_key=${API_KEY}`,
    fetcher
  );

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

type MovieCreditsReq = MovieDetailReq;

type MovieCreditsRes = SWRHookResp & {
  data: MovieCreditsType;
};

export const useMovieCreditsData = ({
  id,
}: MovieCreditsReq): MovieCreditsRes => {
  const { data, error } = useSWR(
    `${API_URL}/movie/${id}/credits?api_key=${API_KEY}`,
    fetcher
  );

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

type MovieImagesReq = MovieDetailReq;

type MovieImagesRes = SWRHookResp & {
  data: MovieImagesType;
};

export const getMovieImages = ({ id }: MovieImagesReq): MovieImagesRes => {
  const { data, error } = useSWR(
    `${API_URL}/movie/${id}/images?api_key=${API_KEY}`,
    fetcher
  );

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

type MovieRecommendationsReq = MovieDetailReq;

type MovieRecommendationsRes = SWRHookResp & {
  data: RawMovieListEntries;
};

export const getMovieRecommendations = ({
  id,
}: MovieRecommendationsReq): MovieRecommendationsRes => {
  const { data, error } = useSWR(
    `${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}`,
    fetcher
  );

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

type PersonDataReq = {
  id: number;
};

type PersonDataRes = SWRHookResp & {
  data: PersonDetailType;
};

export const usePersonData = ({ id }: PersonDataReq): PersonDataRes => {
  const { data, error } = useSWR(`${API_URL}/person/${id}?api_key=${API_KEY}`);

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};
