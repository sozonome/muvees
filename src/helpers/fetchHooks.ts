import useSWR from "swr";

import { tmdbFetcher } from "./fetcher";

import {
  MovieCreditsType,
  MovieDetailType,
  MovieImagesType,
  PersonDetailType,
  RawMovieListEntries,
} from "../models/movies";

const API_URL = `https://api.themoviedb.org/3`;

export type SWRHookResp = {
  isLoading: boolean;
  isError: any;
};

type MovieListRes = SWRHookResp & {
  data: RawMovieListEntries;
};

export type ListType = "now_playing" | "popular" | "top_rated" | "upcoming";

export type MovieListReq = {
  language?: string;
  page?: number;
  query?: string;
};

/**
 * get movie lists
 */
export const movieListEndpoint = (section: ListType, query?: string) =>
  `${API_URL}${query ? "/search" : ""}/movie${query ? "" : `/${section}`}`;

export const useMovieList = (
  section: ListType = "popular",
  shouldFetch: boolean = true,
  qry?: MovieListReq
): MovieListRes => {
  const endpoint = movieListEndpoint(section, qry?.query);

  const { data, error } = useSWR(
    shouldFetch ? [endpoint, qry] : null,
    tmdbFetcher
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

export const movieDataEndpointURL = (id: MovieCreditsReq["id"]) =>
  `${API_URL}/movie/${id}`;

/**
 * get movie details
 */
export const useMovieData = ({ id }: MovieDetailReq): MovieDetailRes => {
  const { data, error } = useSWR(movieDataEndpointURL(id), tmdbFetcher);

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

/**
 * get movie credits
 */
export const movieCreditsEndpointURL = (id: MovieCreditsReq["id"]) =>
  `${API_URL}/movie/${id}/credits`;

export const useMovieCreditsData = ({
  id,
}: MovieCreditsReq): MovieCreditsRes => {
  const { data, error } = useSWR(movieCreditsEndpointURL(id), tmdbFetcher);

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

/**
 * get movie image assets
 */
export const movieImagesEndpointURL = (id: MovieImagesReq["id"]) =>
  `${API_URL}/movie/${id}/images`;

export const getMovieImages = ({ id }: MovieImagesReq): MovieImagesRes => {
  const { data, error } = useSWR(movieImagesEndpointURL(id), tmdbFetcher);

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

/**
 * Get a list of recommended movies for a movie.
 */
export const movieRecommendationsEndpointURL = (
  id: MovieRecommendationsReq["id"]
) => `${API_URL}/movie/${id}/recommendations`;

export const getMovieRecommendations = ({
  id,
}: MovieRecommendationsReq): MovieRecommendationsRes => {
  const { data, error } = useSWR(
    movieRecommendationsEndpointURL(id),
    tmdbFetcher
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

/**
 * get person details
 */
export const personDataEndpointURL = (id: PersonDataReq["id"]) =>
  `${API_URL}/person/${id}`;

export const usePersonData = ({ id }: PersonDataReq): PersonDataRes => {
  const { data, error } = useSWR(personDataEndpointURL(id), tmdbFetcher);

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

type DiscoverMovieReq = {};

export const useDiscoverMovie = (query?: DiscoverMovieReq) => {
  const { data, error } = useSWR(
    [`${API_URL}/discover/movie`, query],
    tmdbFetcher
  );
};
