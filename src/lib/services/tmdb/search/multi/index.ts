import { tmdbServerFetcher, useTmdbSWR } from 'lib/services/tmdb/utils';

import type { MultiSearchParams, MultiSearchResponse } from './types';

const MULTI_SEARCH_RESOURCE_PATH = '/search/multi';

export const getMultiSearchResult = (params: MultiSearchParams) =>
  tmdbServerFetcher<MultiSearchResponse>(MULTI_SEARCH_RESOURCE_PATH, params);

export const useMultiSearchResult = (
  params: MultiSearchParams,
  isReady = true
) =>
  useTmdbSWR<MultiSearchResponse>({
    path: MULTI_SEARCH_RESOURCE_PATH,
    params,
    isReady,
  });
