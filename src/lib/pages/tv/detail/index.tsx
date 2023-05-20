import { Badge, Button, Flex, Grid, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import DetailMeta from 'lib/components/shared/DetailMeta';
import { handleRouteBack } from 'lib/utils/handleRouteBack';

import type { TvShowDetailPageProps } from './types';

const TvShowDetailPage = ({ data }: TvShowDetailPageProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <Grid paddingX={8} gridGap={[8, 16]}>
      <NextSeo title={data.name} description={data.tagline} />

      <Grid rowGap={8} flexBasis={['100%']}>
        <Button onClick={handleRouteBack(router)} width={['full', 'full', 100]}>
          back
        </Button>

        <DetailMeta
          data={{
            name: data.name,
            posterPath: data.poster_path,
            status: data.status,
            releasedDate: data.first_air_date,
            tagline: data.tagline,
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
                >
                  {genre.name}
                </Badge>
              ))}
            </Flex>
          }
        />
      </Grid>
    </Grid>
  );
};

export default TvShowDetailPage;
