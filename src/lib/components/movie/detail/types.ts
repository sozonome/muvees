import type { MovieDetailResponse } from 'lib/services/tmdb/movie/detail/types';

export type MovieDetailSectionProps = {
  isLoading?: boolean;
  data: MovieDetailResponse;
};
