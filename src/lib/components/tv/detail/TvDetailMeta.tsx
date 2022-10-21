import {
  AspectRatio,
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

import { BionifiedParagraph } from "lib/components/BionifiedParagraph";
import PosterImage from "lib/components/shared/PosterImage";
import type { TvShowDetail } from "lib/services/tmdb/tv/detail/types";

type TvShowDetailMetaProps = {
  data: TvShowDetail;
};

const TvShowDetailMeta = ({ data }: TvShowDetailMetaProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      display={{ base: "grid", md: "flex" }}
      alignItems="center"
      gap={{ base: 8, md: 16 }}
    >
      <AspectRatio
        ratio={3.6 / 5}
        minWidth={{ base: undefined, md: 300 }}
        maxHeight={["100%"]}
        maxWidth={["100%"]}
        marginX={[8, "25%", 0]}
      >
        <PosterImage src={data.poster_path} />
      </AspectRatio>

      <Grid gap={4}>
        <Heading
          textAlign={["center", "center", "inherit"]}
          size="lg"
          letterSpacing={2}
          textTransform="uppercase"
          fontWeight="bold"
          marginX={[8, 8, 0]}
        >
          {data.name}
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

        <Flex gridColumnGap={2} alignItems="center">
          <Badge variant={colorMode === "light" ? "solid" : "outline"}>
            {data.status}
          </Badge>

          <Text textTransform="uppercase" letterSpacing={1} fontSize="xs">
            {new Date(data.first_air_date).getFullYear()}
          </Text>
        </Flex>

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

        {data.overview && (
          <BionifiedParagraph textAlign="justify">
            {data.overview}
          </BionifiedParagraph>
        )}
      </Grid>
    </Box>
  );
};

export default TvShowDetailMeta;
