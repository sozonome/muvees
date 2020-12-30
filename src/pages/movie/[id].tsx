import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import PosterImage from "../../components/movies/PosterImage";
import { useMovieData } from "../../helpers/fetchHooks";

const Movie = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, isLoading } = useMovieData({ id: Number(id) });

  return (
    <Grid paddingX={8} rowGap={8}>
      <Button onClick={() => router.back()}>back</Button>
      <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : null}>
        <Heading fontSize="lg">{data && data.title}</Heading>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} maxHeight={["auto", 400]}>
        <AspectRatio
          ratio={3.6 / 5}
          maxHeight={["100%", 400]}
          maxWidth={["100%", 288]}
          margin={[8, 0]}
        >
          <PosterImage src={data && data.poster_path} />
        </AspectRatio>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        <Text>{data && data.overview}</Text>
      </Skeleton>
    </Grid>
  );
};

export default Movie;
