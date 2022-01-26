export type PersonType = {
  adult: boolean;
  gender?: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
};

export type PersonDetailResponse = PersonType & {
  birthday?: string;
  deathday?: string;
  also_known_as: Array<string>;
  biography: string;
  place_of_birth?: string;
  imdb_id: string;
  homepage?: string;
};
