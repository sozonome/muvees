import { Button, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import MovieDetailAdditionalInfo from 'lib/components/movie/detail/AdditionalInfo';
import CastsWrapper from 'lib/components/movie/detail/CastsWrapper';
import MovieDetailMeta from 'lib/components/movie/detail/Meta';
import { handleRouteBack } from 'lib/utils/handleRouteBack';

import type { MovieDetailPageProps } from './types';

const MovieDetailPage = ({
  detailData: data,
  creditsData: credits,
}: MovieDetailPageProps) => {
  const router = useRouter();
  const [movieId, setMovieId] = useState<number>();

  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id) {
      setMovieId(Number(id));
    }
  }, [id]);

  return (
    <Grid paddingX={8} gridGap={[8, 16]}>
      <NextSeo title={data.title} description={data.tagline} />

      <Grid rowGap={8} flexBasis={['100%']}>
        <Button onClick={handleRouteBack(router)} width={['full', 'full', 100]}>
          back
        </Button>

        <MovieDetailMeta data={data} />
      </Grid>

      <Grid
        gap={8}
        alignItems="center"
        templateColumns={{ base: 'minmax(0, 1fr)', md: '1fr minmax(0, 2fr)' }}
        flexBasis={['100%']}
      >
        <MovieDetailAdditionalInfo data={data} id={movieId ?? 0} />

        <CastsWrapper credits={credits} />
      </Grid>
    </Grid>
  );
};

export default MovieDetailPage;
