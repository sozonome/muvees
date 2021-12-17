import { tmdbServerFetcher, useTmdbSWR } from "services/tmdb/utils";

import { MovieImagesResponse } from "./types";

export const getMovieImagesServer = (id: number) =>
  tmdbServerFetcher<MovieImagesResponse>(`/movie/${id}/images`);

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
