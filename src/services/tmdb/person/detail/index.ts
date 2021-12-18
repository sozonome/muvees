import { tmdbServerFetcher, useTmdbSWR } from "services/tmdb/utils";

import { PersonDetailResponse } from "./types";

export const getPersonDetailServer = (id: number) =>
  tmdbServerFetcher<PersonDetailResponse>(`/person/${id}`);

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
