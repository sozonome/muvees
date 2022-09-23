import { AspectRatio, Box } from "@chakra-ui/react";
import Link from "next/link";

import MotionBox from "lib/components/MotionBox";
import PosterImage from "lib/components/shared/PosterImage";
import PosterLabel from "lib/components/shared/PosterLabel";
import type { TVShowItem } from "lib/services/tmdb/tv/list/types";
import { trackEvent } from "lib/utils/trackEvent";

type TvShowItemProps = {
  show: TVShowItem;
  layout: "flex" | "grid";
  isLastItem?: boolean;
};

const TvShowItem = ({ show, layout, isLastItem }: TvShowItemProps) => {
  const handleClickTvShow = () => {
    trackEvent(`TV Show: ${show.name} - ${show.id}`, "navigate");
  };

  return (
    <Link href={`/tv/show/${show.id}`} passHref>
      <MotionBox
        as="a"
        onClick={handleClickTvShow}
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
            <PosterImage src={show.poster_path} layout={layout} />
          </AspectRatio>
        ) : (
          <Box
            as="button"
            borderRadius={24}
            _groupHover={{ backgroundColor: "black" }}
          >
            <PosterImage src={show.poster_path} layout={layout} />
          </Box>
        )}
        <PosterLabel label={show.name ?? ""} />
      </MotionBox>
    </Link>
  );
};

export default TvShowItem;
