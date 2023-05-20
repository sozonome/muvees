import { tmdbServerFetcher, useTmdbSWR } from 'lib/services/tmdb/utils';

import type { TvShowDetail } from './types';

export const getTvShowDetail = (id: string) =>
  tmdbServerFetcher<TvShowDetail>(`/tv/${id}`);

export const useTvShowDetail = (id: string, fallbackData?: TvShowDetail) =>
  useTmdbSWR<TvShowDetail>({ path: `/tv/${id}`, fallbackData });
