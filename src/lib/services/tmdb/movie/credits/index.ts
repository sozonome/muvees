import { tmdbServerFetcher, useTmdbSWR } from 'lib/services/tmdb/utils';

import type { MovieCreditsResponse } from './types';

export const getMovieCreditsServer = (id: number) =>
  tmdbServerFetcher<MovieCreditsResponse>(`/movie/${id}/credits`);

export const useMovieCredits = (
  id: number,
  fallbackData?: MovieCreditsResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieCreditsResponse>({
    path: `/movie/${id}/credits`,
    fallbackData,
    isReady,
  });
