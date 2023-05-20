import type {
  TVShowListResponse,
  TVShowListType,
} from 'lib/services/tmdb/tv/list/types';

export type TVShowListPageParams = {
  listType: string;
};

export type TVShowListPageProps = {
  data?: TVShowListResponse;
  listType: TVShowListType;
};
