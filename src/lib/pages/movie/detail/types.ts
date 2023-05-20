import type { MovieCreditsResponse } from 'lib/services/tmdb/movie/credits/types';
import type { MovieDetailResponse } from 'lib/services/tmdb/movie/detail/types';

export type MovieDetailPageProps = {
  detailData: MovieDetailResponse;
  creditsData: MovieCreditsResponse;
};

export type MovieDetailPageParams = {
  id: string;
};
