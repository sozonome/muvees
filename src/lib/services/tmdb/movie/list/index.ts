import {
  tmdbFetcher,
  tmdbServerFetcher,
  useTmdbSWR,
} from "lib/services/tmdb/utils";

import type {
  ListType,
  MovieListParams,
  MovieListResponse,
  TMovieListParams,
} from "./types";

const SEARCH_RESOURCE_PATH = `/search/movie`;
const DISCOVER_RESOURCE_PATH = `/discover/movie`;

const movieListEndpoint = ({
  section,
  query,
  with_genres,
}: TMovieListParams) => {
  if (query) {
    return SEARCH_RESOURCE_PATH;
  }
  if (with_genres) {
    return DISCOVER_RESOURCE_PATH;
  }
  return `/movie/${section}`;
};

export const getMovieList = (
  section: ListType = "popular",
  params?: MovieListParams
) =>
  tmdbFetcher<MovieListResponse>(
    movieListEndpoint({
      section,
      query: params?.query,
      with_genres: params?.with_genres,
    }),
    params
  );

export const getMovieListServer = (
  section: ListType = "popular",
  params?: MovieListParams
) =>
  tmdbServerFetcher<MovieListResponse>(
    movieListEndpoint({
      section,
      query: params?.query,
      with_genres: params?.with_genres,
    }),
    params
  );

export const useMovieList = (
  section: ListType = "popular",
  params?: MovieListParams,
  fallbackData?: MovieListResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieListResponse>(
    movieListEndpoint({
      section,
      query: params?.query,
      with_genres: params?.with_genres,
    }),
    params,
    fallbackData,
    isReady
  );

export const useMovieRecommendations = (id: number) =>
  useTmdbSWR<MovieListResponse>(`/movie/${id}/recommendations`);
