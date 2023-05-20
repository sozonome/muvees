import { Button, Grid, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import ImageSection from 'lib/components/movie/image/ImageSection';

import type { MovieImagesPageProps } from './types';

const MovieImagesPage = ({ data }: MovieImagesPageProps) => {
  const router = useRouter();

  return (
    <Grid gridGap={[8, 16]} templateColumns="minmax(0,1fr)">
      <Button marginX={8} onClick={() => router.back()}>
        back
      </Button>

      <Heading marginX={8}>Images</Heading>

      {data?.backdrops && (
        <ImageSection title="Backdrops" data={data.backdrops} maxHeight={300} />
      )}

      {data?.posters && (
        <ImageSection title="Posters" data={data.posters} maxHeight={200} />
      )}
    </Grid>
  );
};

export default MovieImagesPage;
