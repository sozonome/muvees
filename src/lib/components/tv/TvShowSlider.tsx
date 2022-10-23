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

import type {
  TVShowItem,
  TVShowListType,
} from "lib/services/tmdb/tv/list/types";

import TvShowItem from "./TvShowItem";

type TvShowListTypeButtonProps = {
  listType: TVShowListType;
};

const TvShowListTypeButton = ({ listType }: TvShowListTypeButtonProps) => {
  const router = useRouter();

  const onClick = () => router.push(`/tv/${listType}?page=1`);

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

const tvShowListTypes: Array<TVShowListType> = [
  "on_the_air",
  "airing_today",
  "top_rated",
];

type TvShowSliderProps = {
  shows?: Array<TVShowItem>;
  sectionTitle?: string;
};

const TvShowSlider = ({ sectionTitle, shows }: TvShowSliderProps) => {
  const router = useRouter();

  const slicedShows = shows?.slice(0, 10);

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
            onClick={() => router.push(`/tv/popular?page=1`)}
          >
            see more
          </Button>
        </Flex>
      )}
      <Skeleton isLoaded={slicedShows && slicedShows.length > 0}>
        <Flex paddingX={[8, 6]} overflowX="scroll">
          <Flex
            flexWrap="nowrap"
            alignItems="center"
            minHeight="250px"
            overflowX="scroll"
            overflow="visible"
            gridColumnGap={6}
          >
            {slicedShows?.map((show, idx) => (
              <TvShowItem
                show={show}
                key={`${show.name}-${show.id}`}
                layout="flex"
                isLastItem={idx === slicedShows.length - 1}
              />
            ))}
          </Flex>
        </Flex>
      </Skeleton>

      <Spacer height={4} />

      <HStack paddingX={{ base: 8, sm: 0 }} spacing={4}>
        {tvShowListTypes.map((type) => (
          <TvShowListTypeButton key={type} listType={type} />
        ))}
      </HStack>
    </Box>
  );
};

export default TvShowSlider;
