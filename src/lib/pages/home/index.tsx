import { Grid } from "@chakra-ui/react";

import MoviesSlider from "lib/components/movie/MoviesSlider";
import TvShowSlider from "lib/components/tv/TvShowSlider";

import type { HomePageProps } from "./types";

const Home = ({
  popularMovieFallbackData,
  popularTvShowFallbackData,
}: HomePageProps) => {
  return (
    <Grid rowGap={8} mb={8} w="full" padding={[0, 8]}>
      <MoviesSlider
        sectionTitle="Popular Movies"
        movies={popularMovieFallbackData?.results}
      />
      <TvShowSlider
        sectionTitle="Popular TV Shows"
        shows={popularTvShowFallbackData.results}
      />
    </Grid>
  );
};

export default Home;
