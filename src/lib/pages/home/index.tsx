import { Grid } from "@chakra-ui/react";

import MoviesSlider from "lib/components/movie/MoviesSlider";
import { useMovieList } from "lib/services/tmdb/movie/list";

import type { HomePageProps } from "./types";

const Home = ({
  popularFallbackData,
  nowPlayingFallbackData,
  topRatedFallbackData,
  upcomingFallbackData,
}: HomePageProps) => {
  const { data: popularData } = useMovieList(
    "popular",
    undefined,
    popularFallbackData
  );
  const { data: nowPlayingData } = useMovieList(
    "now_playing",
    undefined,
    nowPlayingFallbackData
  );
  const { data: topRatedData } = useMovieList(
    "top_rated",
    undefined,
    topRatedFallbackData
  );
  const { data: upcomingData } = useMovieList(
    "upcoming",
    undefined,
    upcomingFallbackData
  );

  return (
    <Grid rowGap={8} mb={8} w="full" padding={[0, 8]}>
      <MoviesSlider
        sectionTitle="Popular"
        movies={popularData && popularData.results}
      />
      <MoviesSlider
        sectionTitle="Now Playing"
        movies={nowPlayingData && nowPlayingData.results}
      />
      <MoviesSlider
        sectionTitle="Top Rated"
        movies={topRatedData && topRatedData.results}
      />
      <MoviesSlider
        sectionTitle="Upcoming"
        movies={upcomingData && upcomingData.results}
      />
    </Grid>
  );
};

export default Home;
