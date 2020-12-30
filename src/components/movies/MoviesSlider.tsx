import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";

import MovieItem from "./MovieItem";

import { MovieListItemType } from "../../models/movies";
import { useRouter } from "next/router";

type MoviesSliderProps = {
  movies?: Array<MovieListItemType>;
  sectionTitle?: string;
};

const MoviesSlider = ({ sectionTitle, movies }: MoviesSliderProps) => {
  const [mobile] = useMediaQuery("(max-width: 30em)");
  const router = useRouter();
  const listType = sectionTitle.toLowerCase().replace(" ", "_");

  return (
    <Box>
      {sectionTitle && (
        <Flex marginX={[8, 0]} alignItems="center">
          <Heading
            textTransform="uppercase"
            letterSpacing={2}
            fontSize={["md", "lg"]}
            fontWeight="400"
          >
            {sectionTitle}
          </Heading>

          <Button
            marginLeft="auto"
            borderRadius={16}
            size={mobile ? "xs" : "sm"}
            onClick={() => router.push(`/movies/${listType}?page=1`)}
          >
            see more
          </Button>
        </Flex>
      )}
      <Skeleton isLoaded={movies && movies.length > 0}>
        <Flex paddingX={[8, 6]} overflowX="scroll">
          <Flex
            flexWrap="nowrap"
            alignItems="center"
            minHeight="250px"
            overflowX="scroll"
            overflow="visible"
            gridColumnGap={6}
          >
            {movies &&
              movies
                .slice(0, 10)
                .map((movie, index) => (
                  <MovieItem movie={movie} key={index} layout="flex" />
                ))}
          </Flex>
        </Flex>
      </Skeleton>
    </Box>
  );
};

export default MoviesSlider;
