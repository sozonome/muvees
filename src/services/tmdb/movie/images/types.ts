export type ImageType = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1?: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type MovieImagesResponse = {
  id: number;
  backdrops: Array<ImageType>;
  posters: Array<ImageType>;
};
