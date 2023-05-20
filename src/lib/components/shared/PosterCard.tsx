import { AspectRatio, Box } from '@chakra-ui/react';
import Link from 'next/link';

import MotionBox from 'lib/components/MotionBox';
import PosterImage from 'lib/components/shared/PosterImage';
import PosterLabel from 'lib/components/shared/PosterLabel';
import type { MediaType } from 'lib/services/tmdb/search/multi/types';
import { trackEvent } from 'lib/utils/trackEvent';

const pathMap: Record<MediaType, string> = {
  movie: '/movie',
  tv: '/tv/show',
  person: '/person',
};

type PosterCardProps = {
  id: number;
  name?: string;
  imageUrl?: string;
  mediaType: MediaType;
  layout: 'flex' | 'grid';
  isLastItem?: boolean;
};

const PosterCard = ({
  id,
  name,
  imageUrl,
  mediaType,
  layout,
  isLastItem,
}: PosterCardProps) => {
  const handleClick = () => {
    trackEvent({
      eventName: `${mediaType}: ${name} - ${id}`,
      eventData: { type: 'navigate' },
    });
  };

  return (
    <Link href={`${pathMap[mediaType]}/${id}`} passHref legacyBehavior>
      <MotionBox
        as="a"
        onClick={handleClick}
        position="relative"
        textAlign="center"
        whileHover={{ scale: 1.05 }}
        role="group"
        paddingRight={isLastItem ? [8, 6] : undefined}
        {...(layout === 'flex' && { flex: '0 0 auto' })}
      >
        {layout === 'grid' ? (
          <AspectRatio
            borderRadius={24}
            ratio={3.6 / 5}
            _groupHover={{ backgroundColor: 'black' }}
          >
            <PosterImage src={imageUrl} layout={layout} />
          </AspectRatio>
        ) : (
          <Box
            as="button"
            borderRadius={24}
            _groupHover={{ backgroundColor: 'black' }}
          >
            <PosterImage src={imageUrl} layout={layout} />
          </Box>
        )}
        <PosterLabel label={name ?? ''} />
      </MotionBox>
    </Link>
  );
};

export default PosterCard;
