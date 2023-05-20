import GridContainer from 'lib/components/shared/GridContainer';
import PosterCard from 'lib/components/shared/PosterCard';
import type { MovieListItemType } from 'lib/services/tmdb/movie/list/types';
import { MediaType } from 'lib/services/tmdb/search/multi/types';

type MoviesContainerProps = {
  isLoading: boolean;
  movies?: Array<MovieListItemType>;
};

const MoviesContainer = ({ movies, isLoading }: MoviesContainerProps) => {
  return (
    <GridContainer isLoading={isLoading}>
      {movies?.map((movie) => (
        <PosterCard
          name={movie.title}
          id={movie.id}
          mediaType={MediaType.Movie}
          imageUrl={movie.poster_path}
          key={`${movie.title}-${movie.id}`}
          layout="grid"
        />
      ))}
    </GridContainer>
  );
};

export default MoviesContainer;
