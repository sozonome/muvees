import { GetStaticProps } from "next";

import Home from "components/pages/home";
import { HomePageProps } from "components/pages/home/types";
import { getMovieListServer } from "services/tmdb/movie/list";

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

export default Home;
