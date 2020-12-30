import {
  AspectRatio,
  Badge,
  Button,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Error from "../../components/layout/Error";

import PosterImage from "../../components/movies/PosterImage";
import { useMovieData } from "../../helpers/fetchHooks";

const Movie = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, isLoading, isError } = useMovieData({ id: Number(id) });

  const { colorMode } = useColorMode();
  const toast = useToast();

  const statusColorScheme = () => {
    if (data) {
      switch (data.status) {
        case "Rumored":
          return "orange";
        case "Planned":
          return "teal";
        case "In Production":
          return "blue";
        case "Post Production":
          return "purple";
        case "Released":
          return "green";
        case "Canceled":
          return "red";
        default:
          return null;
      }
    }
  };

  if (isError) {
    return <Error />;
  }

  return (
    <Grid paddingX={8} rowGap={8}>
      <Button onClick={() => router.back()}>back</Button>

      <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : null}>
        <Heading
          textAlign="center"
          fontSize="md"
          letterSpacing={2}
          textTransform="uppercase"
          fontWeight="300"
          marginX={[8, 0]}
        >
          {data && data.title}
        </Heading>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} maxHeight={["auto", 400]}>
        <AspectRatio
          ratio={3.6 / 5}
          maxHeight={["100%", 400]}
          maxWidth={["100%", 288]}
          marginX={[8, 0]}
        >
          <PosterImage src={data && data.poster_path} />
        </AspectRatio>
        {data && data.tagline && (
          <Text
            textAlign="center"
            fontSize="0.7rem"
            fontWeight="500"
            letterSpacing={2}
            textTransform="uppercase"
            marginTop={4}
            marginX={[8, 0]}
          >
            {data.tagline}
          </Text>
        )}
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        {data && (
          <Flex gridColumnGap={2} alignItems="center">
            <Badge
              variant={colorMode === "light" ? "solid" : "outline"}
              colorScheme={statusColorScheme()}
            >
              {data.status}
            </Badge>

            <Text textTransform="uppercase" letterSpacing={1} fontSize="xs">
              {data.runtime ? `${data.runtime} min. / ` : null}{" "}
              {new Date(data.release_date).getFullYear()}
            </Text>
          </Flex>
        )}
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        {data && data.genres && (
          <Flex wrap="wrap" gridGap={2}>
            {data.genres.map((genre, index) => (
              <Badge
                variant={colorMode === "light" ? "solid" : "outline"}
                colorScheme="gray"
                key={index}
              >
                {genre.name}
              </Badge>
            ))}
          </Flex>
        )}
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <Text fontSize="sm" textAlign="justify">
          {data && data.overview}
        </Text>
      </Skeleton>
    </Grid>
  );
};

export default Movie;
