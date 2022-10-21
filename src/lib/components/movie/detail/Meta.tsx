import {
  AspectRatio,
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

import { BionifiedParagraph } from "lib/components/BionifiedParagraph";
import PosterImage from "lib/components/shared/PosterImage";

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
    <Box
      display={{ base: "grid", md: "flex" }}
      alignItems="center"
      gap={{ base: 8, md: 16 }}
    >
      <Skeleton isLoaded={!isLoading} maxHeight={["auto"]}>
        <AspectRatio
          ratio={3.6 / 5}
          minWidth={{ base: undefined, md: 300 }}
          maxHeight={["100%"]}
          maxWidth={["100%"]}
          marginX={[8, "25%", 0]}
        >
          <PosterImage src={data.poster_path} />
        </AspectRatio>
      </Skeleton>

      <Grid gap={4}>
        <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : undefined}>
          <Heading
            textAlign={["center", "center", "inherit"]}
            size="lg"
            letterSpacing={2}
            textTransform="uppercase"
            fontWeight="bold"
            marginX={[8, 8, 0]}
          >
            {data.title}
          </Heading>

          <Text
            textAlign={["center", "center", "inherit"]}
            fontSize="0.7rem"
            fontWeight="light"
            letterSpacing={2}
            textTransform="uppercase"
            marginTop={4}
            marginX={[8, 8, 0]}
          >
            {data.tagline}
          </Text>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
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
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
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
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          {data.overview && (
            <BionifiedParagraph textAlign="justify">
              {data.overview}
            </BionifiedParagraph>
          )}
        </Skeleton>
      </Grid>
    </Box>
  );
};

export default MovieDetailMeta;
