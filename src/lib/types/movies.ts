export type MovieImagesType = {
  id: number;
  backdrops: Array<ImageType>;
  posters: Array<ImageType>;
};

type ImageType = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1?: string;
  vote_average: number;
  vote_count: number;
  width: number;
};
