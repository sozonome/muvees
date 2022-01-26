import { tmdbServerFetcher, useTmdbSWR } from "lib/services/tmdb/utils";

import { MovieCreditsResponse } from "./types";

export const getMovieCreditsServer = (id: number) =>
  tmdbServerFetcher<MovieCreditsResponse>(`/movie/${id}/credits`);

export const useMovieCredits = (
  id: number,
  fallbackData?: MovieCreditsResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieCreditsResponse>(
    `/movie/${id}/credits`,
    undefined,
    fallbackData,
    isReady
  );
