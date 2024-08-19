import type { Options } from 'ky';
import ky from 'ky';

export const fetcher = <ResType>(
  url: string,
  searchParams?: Options['searchParams']
) => ky.get<ResType>(url, { searchParams }).json();
