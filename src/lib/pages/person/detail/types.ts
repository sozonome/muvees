import type { PersonDetailResponse } from 'lib/services/tmdb/person/detail/types';

export type PersonDetailPageParams = {
  id: string;
};

export type PersonDetailPageProps = {
  data?: PersonDetailResponse;
};
