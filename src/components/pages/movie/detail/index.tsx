import {
  AspectRatio,
  Badge,
  Button,
  Flex,
  Grid,
  Heading,
  Link as ChakraLink,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { FaImdb } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

import Error from "components/layout/Error";
import CastsWrapper from "components/movie/detail/CastsWrapper";
import PosterImage from "components/movie/PosterImage";
import { useMovieCredits } from "services/tmdb/movie/credits";
import { useMovieDetail } from "services/tmdb/movie/detail";
import { convertToPrice } from "utils/convertToPrice";

import { MovieDetailPageProps } from "./types";

// eslint-disable-next-line sonarjs/cognitive-complexity, complexity
const MovieDetailPage = ({
  detailFallbackData,
  creditFallbackData,
}: // eslint-disable-next-line sonarjs/cognitive-complexity
MovieDetailPageProps) => {
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

  const { data, isLoading, isError } = useMovieDetail(
    movieId ?? 0,
    detailFallbackData,
    !!movieId
  );
  const {
    data: credits,
    isLoading: isLoadingCredits,
    // isError: isErrorCredits,
  } = useMovieCredits(movieId ?? 0, creditFallbackData, !!movieId);

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
          return undefined;
      }
    }

    return undefined;
  };

  if (isError) {
    return <Error />;
  }

  return (
    <Grid
      templateColumns={["repeat(1)", "repeat(1)", "repeat(2, minmax(0,1fr))"]}
      paddingX={8}
      gridGap={[8, 16]}
    >
      {data && (
        <Head>
          <title>{data.title} | muvees</title>
        </Head>
      )}
      <Grid rowGap={8} flexBasis={["100%"]}>
        <Button
          onClick={() =>
            window.history.length > 2 ? router.back() : router.push("/")
          }
          width={["full", "full", 100]}
        >
          back
        </Button>

        <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : undefined}>
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
              {data.genres.map((genre) => (
                <Link
                  href={`/movies/genre/${genre.id}?page=1`}
                  key={`${genre.name}-${genre.id}`}
                  passHref
                >
                  <Badge
                    cursor="pointer"
                    variant={colorMode === "light" ? "solid" : "outline"}
                    colorScheme="gray"
                    key={`${genre.name}-${genre.id}`}
                  >
                    {genre.name}
                  </Badge>
                </Link>
              ))}
            </Flex>
          )}
        </Skeleton>
      </Grid>

      <Grid
        rowGap={8}
        alignItems="center"
        templateColumns="minmax(0,1fr)"
        flexBasis={["100%"]}
      >
        <Skeleton isLoaded={!isLoading}>
          <Text textAlign="justify">{data && data.overview}</Text>
        </Skeleton>

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
              <Link href={`/movie/${id}/images`} passHref>
                <Button size="sm" leftIcon={<GrGallery />}>
                  gallery
                </Button>
              </Link>
            </Flex>
          )}
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <Heading fontSize="lg">Achievements</Heading>

          {data && (
            <Grid
              gridGap={1}
              textTransform="uppercase"
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

        <CastsWrapper isLoadingCredits={isLoadingCredits} credits={credits} />
      </Grid>
    </Grid>
  );
};

export default MovieDetailPage;
