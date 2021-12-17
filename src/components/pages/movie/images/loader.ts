import { GetStaticPaths, GetStaticProps } from "next";

import { getMovieImagesServer } from "services/tmdb/movie/images";

import { MovieImagesPageParams, MovieImagesPageProps } from "./types";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  MovieImagesPageProps,
  MovieImagesPageParams
> = async (ctx) => {
  const { params } = ctx;

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const id = Number(params.id);

  const fallbackData = await getMovieImagesServer(id);

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
};
