import { GetStaticPaths, GetStaticProps } from "next";

import {
  MovieDetailPageParams,
  MovieDetailPageProps,
} from "components/pages/movie/detail/types";
import { getMovieCreditsServer } from "services/tmdb/movie/credits";
import { getMovieDetailServer } from "services/tmdb/movie/detail";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  MovieDetailPageProps,
  MovieDetailPageParams
> = async (ctx) => {
  const { params } = ctx;

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const id = Number(params.id);

  const detailFallbackData = await getMovieDetailServer(id);
  const creditFallbackData = await getMovieCreditsServer(id);

  return {
    props: {
      detailFallbackData,
      creditFallbackData,
    },
    revalidate: 60,
  };
};

export { default } from "components/pages/movie/detail";
