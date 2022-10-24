import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import PosterCard from "lib/components/shared/PosterCard";
import type {
  ListType,
  MovieListItemType,
} from "lib/services/tmdb/movie/list/types";
import { MediaType } from "lib/services/tmdb/search/multi/types";

type MovieListTypeButtonProps = {
  listType: ListType;
};

const MovieListTypeButton = ({ listType }: MovieListTypeButtonProps) => {
  const router = useRouter();

  const onClick = () => router.push(`/movies/${listType}?page=1`);

  return (
    <Button
      size={{ base: "xs", sm: "sm" }}
      onClick={onClick}
      textTransform="capitalize"
    >
      {listType.replaceAll("_", " ")}
    </Button>
  );
};

const movieListTypes: Array<ListType> = [
  "now_playing",
  "top_rated",
  "upcoming",
];

type MoviesSliderProps = {
  movies?: Array<MovieListItemType>;
  sectionTitle?: string;
};

const MoviesSlider = ({ sectionTitle, movies }: MoviesSliderProps) => {
  const router = useRouter();

  const slicedMovies = movies?.slice(0, 10);

  return (
    <Box>
      {sectionTitle && (
        <Flex marginX={{ base: 8, sm: 0 }} alignItems="center">
          <Heading
            textTransform="uppercase"
            letterSpacing={2}
            fontSize={{ base: "md", sm: "lg" }}
            fontWeight="400"
          >
            {sectionTitle}
          </Heading>

          <Button
            marginLeft="auto"
            size={{ base: "xs", sm: "sm" }}
            onClick={() => router.push(`/movies/popular?page=1`)}
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
              <PosterCard
                name={movie.title}
                id={movie.id}
                imageUrl={movie.poster_path}
                mediaType={MediaType.Movie}
                key={`${movie.title}-${movie.id}`}
                layout="flex"
                isLastItem={idx === slicedMovies.length - 1}
              />
            ))}
          </Flex>
        </Flex>
      </Skeleton>

      <Spacer height={4} />

      <HStack paddingX={{ base: 8, sm: 0 }} spacing={4}>
        {movieListTypes.map((type) => (
          <MovieListTypeButton key={type} listType={type} />
        ))}
      </HStack>
    </Box>
  );
};

export default MoviesSlider;
