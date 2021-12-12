import { tmdbFetcher, useTmdbSWR } from "services/tmdb/utils";

import { MovieDetailResponse } from "./types";

export const getMovieDetail = (id: number) =>
  tmdbFetcher<MovieDetailResponse>(`/movie/${id}`);

export const useMovieDetail = (
  id: number,
  fallbackData?: MovieDetailResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieDetailResponse>(
    `/movie/${id}`,
    undefined,
    fallbackData,
    isReady
  );
