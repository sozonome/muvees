import { tmdbFetcher, useTmdbSWR } from "services/tmdb/utils";

import { PersonDetailResponse } from "./types";

export const getPersonDetail = (id: string) =>
  tmdbFetcher<PersonDetailResponse>(`/person/${id}`);

export const usePersonDetail = (
  id: number,
  fallbackData?: PersonDetailResponse,
  isReady?: boolean
) =>
  useTmdbSWR<PersonDetailResponse>(
    `/person/${id}`,
    undefined,
    fallbackData,
    isReady
  );
