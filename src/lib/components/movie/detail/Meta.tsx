import { Badge, Flex, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';

import DetailMeta from 'lib/components/shared/DetailMeta';

import type { MovieDetailSectionProps } from './types';

type MovieDetailMetaProps = MovieDetailSectionProps;

const MovieDetailMeta = ({ data }: MovieDetailMetaProps) => {
  const { colorMode } = useColorMode();

  return (
    <DetailMeta
      data={{
        name: data.title,
        tagline: data.tagline,
        status: data.status,
        releasedDate: data.release_date,
        posterPath: data.poster_path,
        overview: data.overview,
      }}
      extras={
        <Flex wrap="wrap" gridGap={2}>
          {data.genres.map((genre) => (
            <Badge
              cursor="pointer"
              variant={colorMode === 'light' ? 'solid' : 'outline'}
              colorScheme="gray"
              key={`${genre.name}-${genre.id}`}
              as={Link}
              href={`/movies/genre/${genre.id}?page=1`}
            >
              {genre.name}
            </Badge>
          ))}
        </Flex>
      }
    />
  );
};

export default MovieDetailMeta;
