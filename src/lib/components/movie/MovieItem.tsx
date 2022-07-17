import { AspectRatio, Box, chakra } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import MotionBox from "lib/components/MotionBox";
import type { MovieListItemType } from "lib/services/tmdb/movie/list/types";
import { trackEvent } from "lib/utils/trackEvent";

import PosterImage from "./PosterImage";
import PosterLabel from "./PosterLabel";

type MovieItemProps = {
  movie: MovieListItemType;
  layout: "flex" | "grid";
  isLastItem?: boolean;
};

const MovieItem = ({ movie, layout, isLastItem }: MovieItemProps) => {
  const { pathname } = useRouter();

  const handleClickMovie = () => {
    trackEvent(
      `Movie: ${movie.title} - ${movie.id} | from ${pathname}`,
      "navigate"
    );
  };

  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <MotionBox
        as="a"
        onClick={handleClickMovie}
        position="relative"
        textAlign="center"
        whileHover={{ scale: 1.05 }}
        role="group"
        paddingRight={isLastItem ? [8, 6] : undefined}
        {...(layout === "flex" && { flex: "0 0 auto" })}
      >
        {layout === "grid" ? (
          <AspectRatio
            borderRadius={24}
            ratio={3.6 / 5}
            _groupHover={{ backgroundColor: "black" }}
          >
            <PosterImage src={movie.poster_path} layout={layout} />
          </AspectRatio>
        ) : (
          <Box borderRadius={24} _groupHover={{ backgroundColor: "black" }}>
            <chakra.button>
              <PosterImage src={movie.poster_path} layout={layout} />
            </chakra.button>
          </Box>
        )}
        <PosterLabel label={movie.title} />
      </MotionBox>
    </Link>
  );
};

export default MovieItem;
