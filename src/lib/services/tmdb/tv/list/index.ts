import { tmdbServerFetcher, useTmdbSWR } from 'lib/services/tmdb/utils';

import type {
  SearchTVShowParams,
  TVShowListParams,
  TVShowListResponse,
  TVShowListType,
} from './types';

export const getTVShowByListType = (
  listType: TVShowListType,
  params?: TVShowListParams
) => tmdbServerFetcher<TVShowListResponse>(`/tv/${listType}`, params);

type UseTVShowByListArgs = {
  listType: TVShowListType;
  params?: TVShowListParams;
  fallbackData?: TVShowListResponse;
};

export const useTVShowByList = ({
  listType,
  params,
  fallbackData,
}: UseTVShowByListArgs) =>
  useTmdbSWR<TVShowListResponse>({
    path: `/tv/${listType}`,
    params,
    fallbackData,
  });

const TV_SHOW_SEARCH_RESOURCE_PATH = '/search/tv';

export const getTVShowSearchResultList = (params: SearchTVShowParams) =>
  tmdbServerFetcher<TVShowListResponse>(TV_SHOW_SEARCH_RESOURCE_PATH, params);

export const useTVShowSearchResultList = (params: SearchTVShowParams) =>
  useTmdbSWR<TVShowListResponse>({
    path: TV_SHOW_SEARCH_RESOURCE_PATH,
    params,
  });
