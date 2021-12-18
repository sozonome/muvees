import { MovieDetailResponse } from "services/tmdb/movie/detail/types";

export type MovieDetailSectionProps = {
  isLoading?: boolean;
  data?: MovieDetailResponse;
};
