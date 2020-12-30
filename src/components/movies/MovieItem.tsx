import { AspectRatio, Box, useColorMode } from "@chakra-ui/react";

import MotionBox from "../MotionBox";
import PosterImage, { IMAGE_URL } from "./PosterImage";
import PosterLabel from "./PosterLabel";

import { MovieListItemType } from "../../models/movies";
import Link from "next/link";

type MovieItemProps = {
  movie: MovieListItemType;
  layout: "flex" | "grid";
};

const MovieItem = ({ movie, layout }: MovieItemProps) => {
  const { colorMode } = useColorMode();

  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <MotionBox
        position="relative"
        textAlign="center"
        whileHover={{ scale: 1.05 }}
        role="group"
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
            <PosterImage src={movie.poster_path} layout={layout} />
          </Box>
        )}
        <PosterLabel label={movie.title} />
      </MotionBox>
    </Link>
  );
};

export default MovieItem;
