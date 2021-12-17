import { MovieCreditsResponse } from "services/tmdb/movie/credits/types";
import { MovieDetailResponse } from "services/tmdb/movie/detail/types";

export type MovieDetailPageProps = {
  detailFallbackData?: MovieDetailResponse;
  creditFallbackData?: MovieCreditsResponse;
};

export type MovieDetailPageParams = {
  id: string;
};
