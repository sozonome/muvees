import {
  AspectRatio,
  Box,
  Button,
  Heading,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
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
    <Box paddingX={8}>
      <Button onClick={() => router.back()}>back</Button>
      <Skeleton
        marginY={2}
        isLoaded={!isLoading}
        minHeight={isLoading ? 16 : null}
      >
        <Heading>{data && data.title}</Heading>
      </Skeleton>
      <Skeleton marginY={2} isLoaded={!isLoading} maxHeight={["auto", 400]}>
        <AspectRatio
          ratio={3.6 / 5}
          maxHeight={["100%", 400]}
          maxWidth={["100%", 288]}
        >
          <PosterImage src={data && data.poster_path} />
        </AspectRatio>
      </Skeleton>
      <Skeleton marginY={2} isLoaded={!isLoading}>
        <Text>{data && data.overview}</Text>
      </Skeleton>
    </Box>
  );
};

export default Movie;
