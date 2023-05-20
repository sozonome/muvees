import GridContainer from 'lib/components/shared/GridContainer';
import PosterCard from 'lib/components/shared/PosterCard';
import { MediaType } from 'lib/services/tmdb/search/multi/types';
import type { TVShowItem } from 'lib/services/tmdb/tv/list/types';

type TvShowListContainerProps = {
  isLoading: boolean;
  shows?: Array<TVShowItem>;
};

const TvShowListContainer = ({
  shows,
  isLoading,
}: TvShowListContainerProps) => {
  return (
    <GridContainer isLoading={isLoading}>
      {shows?.map((show) => (
        <PosterCard
          name={show.name}
          id={show.id ?? 0}
          imageUrl={show.poster_path}
          mediaType={MediaType.Tv}
          key={`${show.name}-${show.id}`}
          layout="grid"
        />
      ))}
    </GridContainer>
  );
};

export default TvShowListContainer;
