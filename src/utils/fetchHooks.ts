import useSWR from "swr";

import {
  MovieCreditsType,
  MovieDetailType,
  MovieImagesType,
  PersonDetailType,
  RawMovieListEntries,
} from "../models/movies";

import { tmdbFetcher } from "./fetcher";

const API_URL = `https://api.themoviedb.org/3`;

export type SWRHookResp = {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  with_genres?: string | string[];
};

type TMovieListReq = Pick<MovieListReq, "query" | "with_genres"> & {
  section: ListType;
};

/**
 * get movie lists
 */
export const movieListEndpoint = ({
  section,
  query,
  with_genres,
}: TMovieListReq) => {
  if (query) {
    return `${API_URL}/search/movie`;
  }
  if (with_genres) {
    return `${API_URL}/discover/movie`;
  }
  return `${API_URL}/movie/${section}`;
};

export const useMovieList = (
  section: ListType = "popular",
  shouldFetch = true,
  qry?: MovieListReq
): MovieListRes => {
  const endpoint = movieListEndpoint({
    section,
    query: qry?.query,
    with_genres: qry?.with_genres,
  });

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

export const useMovieImages = ({ id }: MovieImagesReq): MovieImagesRes => {
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

export const useMovieRecommendations = ({
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

// type DiscoverMovieReq = {};

// export const useDiscoverMovie = (query?: DiscoverMovieReq) => {
//   const { data, error } = useSWR(
//     [`${API_URL}/discover/movie`, query],
//     tmdbFetcher
//   );
// };
