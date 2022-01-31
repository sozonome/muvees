import { Button, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ImageSection from "lib/components/movie/image/ImageSection";
import { useMovieImages } from "lib/services/tmdb/movie/images";

import type { MovieImagesPageProps } from "./types";

const MovieImagesPage = ({ fallbackData }: MovieImagesPageProps) => {
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

  const { data, isLoading } = useMovieImages(
    movieId ?? 0,
    fallbackData,
    !!movieId
  );

  return (
    <Grid gridGap={[8, 16]} templateColumns="minmax(0,1fr)">
      <Button marginX={8} onClick={() => router.back()}>
        back
      </Button>

      <Heading marginX={8}>Images</Heading>

      <Skeleton isLoaded={!isLoading} minHeight={240}>
        {data?.backdrops && (
          <ImageSection
            title="Backdrops"
            data={data.backdrops}
            maxHeight={300}
          />
        )}
      </Skeleton>

      <Skeleton isLoaded={!isLoading} minHeight={240}>
        {data?.posters && (
          <ImageSection title="Posters" data={data.posters} maxHeight={200} />
        )}
      </Skeleton>
    </Grid>
  );
};

export default MovieImagesPage;
