/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetcher = <ResType>(url: string, params?: any) =>
  axios.get<ResType>(url, { params }).then((res) => res.data);
