import { tmdbServerFetcher, useTmdbSWR } from 'lib/services/tmdb/utils';

import type { MovieImagesResponse } from './types';

export const getMovieImagesServer = (id: number) =>
  tmdbServerFetcher<MovieImagesResponse>(`/movie/${id}/images`);

export const useMovieImages = (
  id: number,
  fallbackData?: MovieImagesResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieImagesResponse>({
    path: `/movie/${id}/images`,
    fallbackData,
    isReady,
  });
