import Link from 'next/link';
import { useRouter } from 'next/router';

import { ChipButton } from 'lib/components/shared/ChipButton';
import PosterCard from 'lib/components/shared/PosterCard';
import SliderContainer from 'lib/components/shared/SliderContainer';
import type {
  ListType,
  MovieListItemType,
} from 'lib/services/tmdb/movie/list/types';
import { MediaType } from 'lib/services/tmdb/search/multi/types';

type MovieListTypeButtonProps = {
  listType: ListType;
};

const MovieListTypeButton = ({ listType }: MovieListTypeButtonProps) => {
  return (
    <ChipButton as={Link} href={`/movies/${listType}?page=1`}>
      {listType.replaceAll('_', ' ')}
    </ChipButton>
  );
};

const movieListTypes: Array<ListType> = [
  'now_playing',
  'top_rated',
  'upcoming',
];

type MoviesSliderProps = {
  movies?: Array<MovieListItemType>;
  sectionTitle?: string;
};

const MoviesSlider = ({ sectionTitle, movies }: MoviesSliderProps) => {
  const router = useRouter();

  const slicedMovies = movies?.slice(0, 10);

  const handleClickSeeMore = () => router.push(`/movies/popular?page=1`);

  return (
    <SliderContainer
      sectionTitle={sectionTitle}
      onClickSeeMore={handleClickSeeMore}
      footer={movieListTypes.map((type) => (
        <MovieListTypeButton key={type} listType={type} />
      ))}
    >
      {slicedMovies?.map((movie, idx) => (
        <PosterCard
          name={movie.title}
          id={movie.id}
          imageUrl={movie.poster_path}
          mediaType={MediaType.Movie}
          key={`${movie.title}-${movie.id}`}
          layout="flex"
          isLastItem={idx === slicedMovies.length - 1}
        />
      ))}
    </SliderContainer>
  );
};

export default MoviesSlider;
