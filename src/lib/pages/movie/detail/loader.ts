import type { GetStaticProps } from "next";

import { getMovieCreditsServer } from "lib/services/tmdb/movie/credits";
import { getMovieDetailServer } from "lib/services/tmdb/movie/detail";

import type { MovieDetailPageParams, MovieDetailPageProps } from "./types";

export { getStaticPaths } from "lib/utils/defaultGetStaticPaths";

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

  try {
    const id = Number(params.id);
    const detailFallbackData = await getMovieDetailServer(id);
    const creditFallbackData = await getMovieCreditsServer(id);

    return {
      props: {
        detailFallbackData,
        creditFallbackData,
      },
      revalidate: 86400,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
