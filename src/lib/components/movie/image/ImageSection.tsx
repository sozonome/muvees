import { Box, Flex, Heading, Link } from '@chakra-ui/react';

import PosterImage, {
  IMAGE_URL_ORIGINAL,
} from 'lib/components/shared/PosterImage';
import type { ImageType } from 'lib/services/tmdb/movie/images/types';

type ImageSectionProps = {
  title: string;
  data: Array<ImageType>;
  maxHeight?: number;
};

const ImageSection = ({ title, data, maxHeight }: ImageSectionProps) => {
  return (
    <Box>
      <Heading marginX={8} fontSize="2xl">
        {title}
      </Heading>
      <Flex paddingX={[8, 6]} overflowX="scroll">
        <Flex alignItems="center" gridGap={4} minHeight={360}>
          {data.map((image) => (
            <Link
              display="contents"
              href={`${IMAGE_URL_ORIGINAL}${image.file_path}`}
              isExternal
            >
              <PosterImage
                src={image.file_path}
                key={image.file_path}
                maxHeight={maxHeight}
              />
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ImageSection;
