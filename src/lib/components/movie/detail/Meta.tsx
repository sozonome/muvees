import {
  AspectRatio,
  Badge,
  Flex,
  Heading,
  Link,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import PosterImage from "lib/components/movie/PosterImage";

import type { MovieDetailSectionProps } from "./types";

type MovieDetailMetaProps = MovieDetailSectionProps;

const MovieDetailMeta = ({ isLoading, data }: MovieDetailMetaProps) => {
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

  return (
    <>
      <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : undefined}>
        {data?.title && (
          <Heading
            textAlign={["center", "center", "inherit"]}
            fontSize="md"
            letterSpacing={2}
            textTransform="uppercase"
            fontWeight="300"
            marginX={[8, 8, 0]}
          >
            {data.title}
          </Heading>
        )}
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
        {data?.tagline && (
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
                  as="a"
                >
                  {genre.name}
                </Badge>
              </Link>
            ))}
          </Flex>
        )}
      </Skeleton>
    </>
  );
};

export default MovieDetailMeta;
