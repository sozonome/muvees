import { Grid } from '@chakra-ui/react';

import MoviesSlider from 'lib/components/movie/MoviesSlider';
import TvShowSlider from 'lib/components/tv/TvShowSlider';

import type { HomePageProps } from './types';

const Home = ({ popularMovieData, popularTvShowData }: HomePageProps) => {
  return (
    <Grid rowGap={8} mb={8} w="full" padding={[0, 8]}>
      <MoviesSlider
        sectionTitle="Popular Movies"
        movies={popularMovieData?.results}
      />
      <TvShowSlider
        sectionTitle="Popular TV Shows"
        shows={popularTvShowData.results}
      />
    </Grid>
  );
};

export default Home;
