import type { ImageProps } from '@chakra-ui/react';
import { Image, useColorMode } from '@chakra-ui/react';

export const IMAGE_URL = `https://image.tmdb.org/t/p/w500`;
export const IMAGE_URL_ORIGINAL = `https://image.tmdb.org/t/p/original`;

type PosterImageProps = ImageProps & {
  layout?: 'grid' | 'flex';
};

const PosterImage = ({ src, layout, ...props }: PosterImageProps) => {
  const { colorMode } = useColorMode();

  const flexSize: ImageProps = {
    height: '12.5rem',
    width: '9rem',
  };

  return (
    <Image
      _groupHover={{ opacity: 0.5 }}
      borderRadius={24}
      src={src ? `${IMAGE_URL}${src}` : `/Movie Night-bro.svg`}
      style={{
        filter: `drop-shadow(0 0 0.75rem ${
          colorMode === 'light' ? 'gray' : 'black'
        })`,
        ...props.style,
      }}
      {...(layout === 'flex' && flexSize)}
      {...props}
      alt={IMAGE_URL}
    />
  );
};

export default PosterImage;
