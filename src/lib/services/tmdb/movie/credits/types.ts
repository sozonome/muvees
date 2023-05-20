import type { PersonType } from 'lib/services/tmdb/person/detail/types';

type CreditCastType = PersonType & {
  cast_id: number;
  character: string;
  order: number;
};

type CreditCrewType = PersonType & {
  department: string;
  job: string;
};

export type MovieCreditsResponse = {
  id: number;
  cast: Array<CreditCastType>;
  crew: Array<CreditCrewType>;
};
