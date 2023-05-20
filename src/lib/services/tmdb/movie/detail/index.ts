import { tmdbServerFetcher, useTmdbSWR } from 'lib/services/tmdb/utils';

import type { MovieDetailResponse } from './types';

export const getMovieDetailServer = (id: number) =>
  tmdbServerFetcher<MovieDetailResponse>(`/movie/${id}`);

export const useMovieDetail = (
  id: number,
  fallbackData?: MovieDetailResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieDetailResponse>({
    path: `/movie/${id}`,
    fallbackData,
    isReady,
  });
