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
import { convertToPrice } from "../../helpers/convertToPrice";
import { useMovieData } from "../../helpers/fetchHooks";

const Movie = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, isLoading, isError } = useMovieData({ id: Number(id) });
  // const { data: credits, isLoading: isLoadingCredits } = useMovieData({
  //   id: Number(id),
  //   credits: true,
  // });

  const { colorMode } = useColorMode();

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
    <Grid
      templateColumns={["repeat(1)", "repeat(1)", "repeat(2, 1fr)"]}
      paddingX={8}
      gridGap={[8, 16]}
    >
      <Grid rowGap={8}>
        <Button onClick={() => router.back()} width={["full", "full", 100]}>
          back
        </Button>

        <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : null}>
          <Heading
            textAlign={["center", "center", "inherit"]}
            fontSize="md"
            letterSpacing={2}
            textTransform="uppercase"
            fontWeight="300"
            marginX={[8, 8, 0]}
          >
            {data && data.title}
          </Heading>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} maxHeight={["auto"]}>
          <AspectRatio
            ratio={3.6 / 5}
            maxHeight={["100%"]}
            maxWidth={["100%"]}
            marginX={[8, "25%", 0]}
          >
            <PosterImage src={data && data.poster_path} />
          </AspectRatio>
          {data && data.tagline && (
            <Text
              textAlign={["center", "center", "inherit"]}
              fontSize="0.7rem"
              fontWeight="500"
              letterSpacing={2}
              textTransform="uppercase"
              marginTop={4}
              marginX={[8, 8, 0]}
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
      </Grid>

      <Grid rowGap={8}>
        <Skeleton isLoaded={!isLoading}>
          <Text textAlign="justify">{data && data.overview}</Text>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <Heading fontSize="lg">Achievements</Heading>

          {data && (
            <Grid
              gridGap={1}
              textTransform={"uppercase"}
              letterSpacing={2}
              fontSize="sm"
            >
              <Text>
                Revenue:{" "}
                <Text as="span" fontWeight="bold" letterSpacing={0}>
                  {convertToPrice(data.revenue)}
                </Text>
              </Text>
              <Text>
                Rating : <b>{data.vote_average}</b>{" "}
                <Text as="span" fontSize="xs">
                  {" "}
                  ({data.vote_count} voted)
                </Text>
              </Text>
            </Grid>
          )}
        </Skeleton>
      </Grid>
    </Grid>
  );
};

export default Movie;
