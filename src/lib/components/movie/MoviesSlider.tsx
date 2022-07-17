import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import type { MovieListItemType } from "lib/services/tmdb/movie/list/types";

import MovieItem from "./MovieItem";

type MoviesSliderProps = {
  movies?: Array<MovieListItemType>;
  sectionTitle?: string;
};

const MoviesSlider = ({ sectionTitle, movies }: MoviesSliderProps) => {
  const [mobile] = useMediaQuery("(max-width: 30em)");
  const router = useRouter();
  const listType = sectionTitle?.toLowerCase().replace(" ", "_");

  const slicedMovies = movies?.slice(0, 10);

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
            size={mobile ? "xs" : "sm"}
            onClick={() => router.push(`/movies/${listType}?page=1`)}
          >
            see more
          </Button>
        </Flex>
      )}
      <Skeleton isLoaded={slicedMovies && slicedMovies.length > 0}>
        <Flex paddingX={[8, 6]} overflowX="scroll">
          <Flex
            flexWrap="nowrap"
            alignItems="center"
            minHeight="250px"
            overflowX="scroll"
            overflow="visible"
            gridColumnGap={6}
          >
            {slicedMovies?.map((movie, idx) => (
              <MovieItem
                movie={movie}
                key={`${movie.title}-${movie.id}`}
                layout="flex"
                isLastItem={idx === slicedMovies.length - 1}
              />
            ))}
          </Flex>
        </Flex>
      </Skeleton>
    </Box>
  );
};

export default MoviesSlider;
