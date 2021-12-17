import { MovieDetailPageParams } from "components/pages/movie/detail/types";
import { MovieImagesResponse } from "services/tmdb/movie/images/types";

export type MovieImagesPageProps = {
  fallbackData?: MovieImagesResponse;
};

export type MovieImagesPageParams = MovieDetailPageParams;
