import type { MovieDetailPageParams } from 'lib/pages/movie/detail/types';
import type { MovieImagesResponse } from 'lib/services/tmdb/movie/images/types';

export type MovieImagesPageProps = {
  data?: MovieImagesResponse;
};

export type MovieImagesPageParams = MovieDetailPageParams;
