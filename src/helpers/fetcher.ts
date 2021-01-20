import axios from "axios";

export const fetcher = (url: string, query?: any) =>
  axios.get(url, { params: query }).then((res) => res.data);

// export const tmdbFetcher = (url: string, query?: any) =>
//   fetcher(url, { api_key: API_KEY, ...query });
