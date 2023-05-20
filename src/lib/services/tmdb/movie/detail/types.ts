import type { MovieListItemType } from 'lib/services/tmdb/movie/list/types';

type GenreType = {
  id: number;
  name: string;
};

type ProductionCompanyType = {
  name: string;
  id: number;
  logo_path?: string;
  origin_country: string;
};

type ProductionCountryType = {
  iso_3166_1: string;
  name: string;
};

type LanguageType = {
  iso_639_1: string;
  name: string;
};

export type MovieDetailResponse = Omit<MovieListItemType, 'genre_ids'> & {
  belongs_to_collection?: Record<string, unknown>;
  budget: number;
  genres: Array<GenreType>;
  homepage?: string;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  production_companies: Array<ProductionCompanyType>;
  production_countries: Array<ProductionCountryType>;
  revenue: number;
  runtime?: number;
  spoken_languages: Array<LanguageType>;
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  tagline?: string;
};
