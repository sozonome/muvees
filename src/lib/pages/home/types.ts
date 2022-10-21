import type { MovieListResponse } from "lib/services/tmdb/movie/list/types";
import type { TVShowListResponse } from "lib/services/tmdb/tv/list/types";

export type HomePageProps = {
  popularMovieFallbackData: MovieListResponse;
  popularTvShowFallbackData: TVShowListResponse;
};
