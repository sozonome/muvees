import type { GetStaticProps } from "next";

import type { HomePageProps } from "lib/pages/home/types";
import { getMovieListServer } from "lib/services/tmdb/movie/list";

// eslint-disable-next-line import/prefer-default-export
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const popularFallbackData = await getMovieListServer("popular");
  const nowPlayingFallbackData = await getMovieListServer("now_playing");
  const topRatedFallbackData = await getMovieListServer("top_rated");
  const upcomingFallbackData = await getMovieListServer("upcoming");

  return {
    props: {
      popularFallbackData,
      nowPlayingFallbackData,
      topRatedFallbackData,
      upcomingFallbackData,
    },
    revalidate: 60,
  };
};
