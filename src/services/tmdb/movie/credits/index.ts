import { useTmdbSWR } from "services/tmdb/utils";

import { MovieCreditsResponse } from "./types";

export const useMovieCredits = (id: number, isReady?: boolean) =>
  useTmdbSWR<MovieCreditsResponse>(
    `/movie/${id}/credits`,
    undefined,
    undefined,
    isReady
  );
