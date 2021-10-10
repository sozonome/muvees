import { Grid } from "@chakra-ui/react";

import MoviesSlider from "components/movies/MoviesSlider";
import { useMovieList } from "utils/fetchHooks";

const Home = () => {
  const { data: popularData } = useMovieList("popular");
  const { data: nowPlayingData } = useMovieList("now_playing");
  const { data: topRatedData } = useMovieList("top_rated");
  const { data: upcomingData } = useMovieList("upcoming");

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
