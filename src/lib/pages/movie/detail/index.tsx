import { Button, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import CastsWrapper from 'lib/pages/movie/detail/components/CastsWrapper';
import { handleRouteBack } from 'lib/utils/handleRouteBack';
import { useMovieDetail } from 'lib/services/tmdb/movie/detail';

import MovieDetailMeta from './components/Meta';
import MovieDetailAdditionalInfo from './components/AdditionalInfo';
import type { MovieDetailPageProps } from './types';

const MovieDetailPage = ({
  detailData,
  creditsData: credits,
}: MovieDetailPageProps) => {
  const router = useRouter();
  const [movieId, setMovieId] = useState<number>();

  const { data } = useMovieDetail(Number(movieId), detailData);

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
      <NextSeo title={data?.title} description={data?.tagline} />

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
