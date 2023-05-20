import Link from 'next/link';
import { useRouter } from 'next/router';

import { ChipButton } from 'lib/components/shared/ChipButton';
import PosterCard from 'lib/components/shared/PosterCard';
import SliderContainer from 'lib/components/shared/SliderContainer';
import { MediaType } from 'lib/services/tmdb/search/multi/types';
import type {
  TVShowItem,
  TVShowListType,
} from 'lib/services/tmdb/tv/list/types';

type TvShowListTypeButtonProps = {
  listType: TVShowListType;
};

const TvShowListTypeButton = ({ listType }: TvShowListTypeButtonProps) => {
  return (
    <ChipButton as={Link} href={`/tv/${listType}?page=1`}>
      {listType.replaceAll('_', ' ')}
    </ChipButton>
  );
};

const tvShowListTypes: Array<TVShowListType> = [
  'on_the_air',
  'airing_today',
  'top_rated',
];

type TvShowSliderProps = {
  shows?: Array<TVShowItem>;
  sectionTitle?: string;
};

const TvShowSlider = ({ sectionTitle, shows }: TvShowSliderProps) => {
  const router = useRouter();

  const slicedShows = shows?.slice(0, 10);

  const handleClickSeeMore = () => router.push(`/tv/popular?page=1`);

  return (
    <SliderContainer
      sectionTitle={sectionTitle}
      onClickSeeMore={handleClickSeeMore}
      footer={tvShowListTypes.map((type) => (
        <TvShowListTypeButton key={type} listType={type} />
      ))}
    >
      {slicedShows?.map((show, idx) => (
        <PosterCard
          name={show.name}
          id={show.id ?? 0}
          imageUrl={show.poster_path}
          mediaType={MediaType.Tv}
          key={`${show.name}-${show.id}`}
          layout="flex"
          isLastItem={idx === slicedShows.length - 1}
        />
      ))}
    </SliderContainer>
  );
};

export default TvShowSlider;
