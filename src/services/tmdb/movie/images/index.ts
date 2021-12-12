import { tmdbFetcher, useTmdbSWR } from "services/tmdb/utils";

import { MovieImagesResponse } from "./types";

export const getMovieImages = (id: number) =>
  tmdbFetcher<MovieImagesResponse>(`/movie/${id}/images`);

export const useMovieImages = (
  id: number,
  fallbackData?: MovieImagesResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieImagesResponse>(
    `/movie/${id}/images`,
    undefined,
    fallbackData,
    isReady
  );
