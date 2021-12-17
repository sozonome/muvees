import { tmdbServerFetcher, useTmdbSWR } from "services/tmdb/utils";

import { MovieDetailResponse } from "./types";

export const getMovieDetailServer = (id: number) =>
  tmdbServerFetcher<MovieDetailResponse>(`/movie/${id}`);

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
