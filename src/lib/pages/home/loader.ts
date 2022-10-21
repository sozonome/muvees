import type { GetStaticProps } from "next";

import type { HomePageProps } from "lib/pages/home/types";
import { getMovieListServer } from "lib/services/tmdb/movie/list";
import { getTVShowByListType } from "lib/services/tmdb/tv/list";

// eslint-disable-next-line import/prefer-default-export
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const popularMovieFallbackData = await getMovieListServer("popular");
  const popularTvShowFallbackData = await getTVShowByListType("popular");

  return {
    props: {
      popularMovieFallbackData,
      popularTvShowFallbackData,
    },
    revalidate: 43200,
  };
};
