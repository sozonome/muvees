import type { TmdbAPIListResponse } from "lib/services/tmdb/types";

enum TVShowList {
  airing_today,
  on_the_air,
  popular,
  top_rated,
}

export type TVShowListType = keyof typeof TVShowList;

export type TVShowListParams = {
  language?: string;
  page?: number;
};

export type SearchTVShowParams = TVShowListParams & {
  query: string;
  include_adult?: boolean;
  first_air_date_year?: number;
};

export type TVShowItem = Partial<{
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: Array<string>;
  genre_ids: Array<number>;
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}>;

export type TVShowListResponse = TmdbAPIListResponse<TVShowItem>;
