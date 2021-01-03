import { Box, Button, Flex, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";

import PosterImage, {
  IMAGE_URL_ORIGINAL,
} from "../../../components/movies/PosterImage";

import { getMovieImages } from "../../../helpers/fetchHooks";

const Images = () => {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, isLoading } = getMovieImages({ id: Number(id) });

  const handleClick = (file_path: string) => () => {
    window.open(`${IMAGE_URL_ORIGINAL}${file_path}`, "_blank");
  };

  return (
    <Grid gridGap={[8, 16]} templateColumns="minmax(0,1fr)">
      <Button marginX={8} onClick={() => router.back()}>
        back
      </Button>

      <Heading marginX={8}>Images</Heading>

      <Skeleton isLoaded={!isLoading} minHeight={240}>
        {data && (
          <Box>
            <Heading marginX={8} fontSize="2xl">
              Backdrops
            </Heading>
            <Flex paddingX={[8, 6]} overflowX="scroll">
              <Flex alignItems="center" gridGap={4} minHeight={360}>
                {data.backdrops.map((backdrop, index) => (
                  <PosterImage
                    src={backdrop.file_path}
                    key={index}
                    maxHeight={300}
                    onClick={handleClick(backdrop.file_path)}
                  />
                ))}
              </Flex>
            </Flex>
          </Box>
        )}
      </Skeleton>

      <Skeleton isLoaded={!isLoading} minHeight={240}>
        {data && (
          <Box>
            <Heading marginX={8} fontSize="2xl">
              Posters
            </Heading>

            <Flex paddingX={[8, 6]} overflowX="scroll">
              <Flex alignItems="center" gridGap={4} minHeight={[64, 320]}>
                {data.posters.map((poster, index) => (
                  <PosterImage
                    src={poster.file_path}
                    maxHeight={200}
                    key={index}
                    onClick={handleClick(poster.file_path)}
                  />
                ))}
              </Flex>
            </Flex>
          </Box>
        )}
      </Skeleton>
    </Grid>
  );
};

export default Images;
