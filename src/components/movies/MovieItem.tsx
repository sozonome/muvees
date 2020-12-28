import { AspectRatio, Box } from "@chakra-ui/react";

import MotionBox from "../MotionBox";
import PosterImage from "./PosterImage";
import PosterLabel from "./PosterLabel";

import { MovieType } from "../../models/movies";

type MovieItemProps = {
  movie: MovieType;
  layout: "flex" | "grid";
};

const MovieItem = ({ movie, layout }: MovieItemProps) => {
  return (
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
          boxShadow="10px 10px 77px -32px rgba(0,0,0,0.40);"
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
  );
};

export default MovieItem;
