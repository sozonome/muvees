import { Image, ImageProps } from "@chakra-ui/react";

const IMAGE_URL = `https://image.tmdb.org/t/p/w500`;

type PosterImageProps = {
  src: string;
  layout: "grid" | "flex";
};

const PosterImage = ({ src, layout }: PosterImageProps) => {
  const flexSize: ImageProps = {
    height: "12.5rem",
    width: "9rem",
  };

  return (
    <Image
      {...(layout === "flex" && flexSize)}
      _groupHover={{ opacity: 0.5 }}
      borderRadius={24}
      src={`${IMAGE_URL}${src}`}
    />
  );
};

export default PosterImage;
