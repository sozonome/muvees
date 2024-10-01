import { Grid } from '@chakra-ui/react';

import MoviesSlider from 'lib/components/movie/MoviesSlider';
import TvShowSlider from 'lib/components/tv/TvShowSlider';

import type { HomePageProps } from './types';
import { useMovieList } from 'lib/services/tmdb/movie/list';
import { useTVShowList } from 'lib/services/tmdb/tv/list';

const Home = ({ popularMovieData, popularTvShowData }: HomePageProps) => {
  const { data: movieData } = useMovieList(
    'popular',
    undefined,
    popularMovieData
  );
  const { data: tvShowData } = useTVShowList({
    listType: 'popular',
    fallbackData: popularTvShowData,
  });

  return (
    <Grid rowGap={8} mb={8} w="full" padding={[0, 8]}>
      <MoviesSlider sectionTitle="Popular Movies" movies={movieData?.results} />
      <TvShowSlider
        sectionTitle="Popular TV Shows"
        shows={tvShowData?.results}
      />
    </Grid>
  );
};

export default Home;
