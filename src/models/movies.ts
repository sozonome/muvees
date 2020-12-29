export type RawEntries = {
  page: number;
  results: Array<MovieListItemType>;
  dates: DatesType;
  total_pages: number;
  total_results: number;
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

export type MovieDetailType = Omit<MovieListItemType, "genre_ids"> & {
  belongs_to_collection?: object;
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
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  tagline?: string;
};

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
