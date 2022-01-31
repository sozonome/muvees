import type { MovieDetailPageParams } from "lib/pages/movie/detail/types";
import type { MovieImagesResponse } from "lib/services/tmdb/movie/images/types";

export type MovieImagesPageProps = {
  fallbackData?: MovieImagesResponse;
};

export type MovieImagesPageParams = MovieDetailPageParams;
