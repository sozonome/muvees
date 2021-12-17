/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";

import { SWRHookResponse } from "types/SWRHook";
import { fetcher } from "utils/fetcher";

import { TMDB_API_KEY, TMDB_API_URL } from "./constants";

export const tmdbServerFetcher = <ResType>(path: string, params?: any) =>
  fetcher<ResType>(`${TMDB_API_URL}${path}`, {
    ...params,
    api_key: TMDB_API_KEY,
  });

export const tmdbFetcher = <ResType>(path: string, params?: any) =>
  fetcher<ResType>(`/api/tmdb${path}`, params);

export const useTmdbSWR = <ResType>(
  path: string,
  params?: any,
  fallbackData?: ResType,
  isReady = true
): SWRHookResponse<ResType> => {
  const { data, error, mutate } = useSWR<ResType>(
    [path, params],
    isReady ? tmdbFetcher : null,
    {
      fallbackData,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
