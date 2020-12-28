import { Box } from "@chakra-ui/react";
import { useState } from "react";
import MoviesSlider from "../components/movies/MoviesSlider";
import { useMovieList, ListType } from "../helpers/fetchHooks";

const Home = () => {
  const { data: popularData } = useMovieList({ section: "popular" });
  const { data: nowPlayingData } = useMovieList({ section: "now_playing" });
  const { data: topRatedData } = useMovieList({ section: "top_rated" });
  const { data: upcomingData } = useMovieList({ section: "upcoming" });

  return (
    <Box mb={8} w="full" padding={[0, 8]}>
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
    </Box>
  );
};

export default Home;
