export type RawEntries = {
  page: number;
  results: Array<MovieType>;
  dates: DatesType;
  total_pages: number;
  total_results: number;
};

export type MovieType = {
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
