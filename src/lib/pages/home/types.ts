import { MovieListResponse } from "lib/services/tmdb/movie/list/types";

export type HomePageProps = {
  popularFallbackData: MovieListResponse;
  nowPlayingFallbackData: MovieListResponse;
  topRatedFallbackData: MovieListResponse;
  upcomingFallbackData: MovieListResponse;
};
