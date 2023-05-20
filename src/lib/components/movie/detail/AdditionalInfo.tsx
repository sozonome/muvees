import {
  Button,
  Flex,
  Grid,
  Heading,
  Link as ChakraLink,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';
import { FaImdb } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';

import { convertToPrice } from 'lib/utils/convertToPrice';

import type { MovieDetailSectionProps } from './types';

type MovieDetailAdditionalInfoProps = MovieDetailSectionProps & {
  id: number;
};

const MovieDetailAdditionalInfo = ({
  isLoading,
  data,
  id,
}: MovieDetailAdditionalInfoProps) => {
  return (
    <Grid gap={8}>
      <Skeleton isLoaded={!isLoading}>
        {data && (
          <Flex gridColumnGap={2}>
            {data.homepage && (
              <ChakraLink _hover={undefined} href={data.homepage} isExternal>
                <Button size="sm" leftIcon={<BiLinkExternal />}>
                  website
                </Button>
              </ChakraLink>
            )}
            {data.imdb_id && (
              <ChakraLink
                href={`https://www.imdb.com/title/${data.imdb_id}`}
                isExternal
              >
                <Button size="sm" leftIcon={<FaImdb />}>
                  IMDB
                </Button>
              </ChakraLink>
            )}

            <Button
              as={Link}
              href={`/movie/${id}/images`}
              size="sm"
              leftIcon={<GrGallery />}
            >
              gallery
            </Button>
          </Flex>
        )}
      </Skeleton>

      <Skeleton display="grid" gap={4} isLoaded={!isLoading}>
        <Heading fontSize="lg">Achievements</Heading>

        <Grid
          gridGap={1}
          textTransform="uppercase"
          letterSpacing={2}
          fontSize="sm"
        >
          <Text>
            Revenue:{' '}
            <Text as="span" fontWeight="bold" letterSpacing={0}>
              {convertToPrice(data.revenue)}
            </Text>
          </Text>
          <Text>
            Rating: <b>{data.vote_average}</b>{' '}
            <Text as="span" fontSize="xs">
              {' '}
              ({data.vote_count} voted)
            </Text>
          </Text>
        </Grid>
      </Skeleton>
    </Grid>
  );
};

export default MovieDetailAdditionalInfo;
