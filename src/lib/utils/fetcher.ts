import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export const fetcher = <ResType>(
  url: string,
  params?: AxiosRequestConfig["params"]
) => axios.get<ResType>(url, { params }).then((res) => res.data);
