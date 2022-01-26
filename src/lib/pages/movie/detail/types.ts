import { MovieCreditsResponse } from "lib/services/tmdb/movie/credits/types";
import { MovieDetailResponse } from "lib/services/tmdb/movie/detail/types";

export type MovieDetailPageProps = {
  detailFallbackData?: MovieDetailResponse;
  creditFallbackData?: MovieCreditsResponse;
};

export type MovieDetailPageParams = {
  id: string;
};
