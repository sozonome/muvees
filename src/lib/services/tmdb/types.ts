export type TmdbAPIListResponse<ResultItemType> = {
  page: number;
  results: Array<ResultItemType>;
  total_results: number;
  total_pages: number;
};
