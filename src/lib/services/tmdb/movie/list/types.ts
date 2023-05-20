import type { TmdbAPIListResponse } from 'lib/services/tmdb/types';

export type ListType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export type MovieListParams = {
  language?: string;
  page?: number;
  query?: string;
  with_genres?: string | string[];
};

export type TMovieListParams = Pick<
  MovieListParams,
  'query' | 'with_genres'
> & {
  section: ListType;
};

export type MovieListItemType = {
  poster_path?: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export type DatesType = {
  maximum: string;
  minimum: string;
};

export type MovieListResponse = TmdbAPIListResponse<MovieListItemType> & {
  dates: DatesType;
};
