import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import PosterImage from "lib/components/movie/PosterImage";
import { usePersonDetail } from "lib/services/tmdb/person/detail";
import { countAge } from "lib/utils/countAge";

import { PersonDetailPageProps } from "./types";

const PersonDetailPage = ({ fallbackData }: PersonDetailPageProps) => {
  const router = useRouter();

  const [movieId, setMovieId] = useState<number>();

  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id) {
      setMovieId(Number(id));
    }
  }, [id]);

  const { data, isLoading } = usePersonDetail(
    movieId ?? 0,
    fallbackData,
    !!movieId
  );

  return (
    <Grid marginX={8} gap={8}>
      <Button onClick={() => router.back()}>back</Button>

      <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : undefined}>
        {data && (
          <Heading
            textAlign={["center", "center", "inherit"]}
            fontSize="md"
            letterSpacing={2}
            textTransform="uppercase"
            fontWeight="300"
            marginX={[8, 8, 0]}
          >
            {data.name}
          </Heading>
        )}
      </Skeleton>

      <Skeleton isLoaded={!isLoading} marginX={[0, 0, 32]} maxHeight={["auto"]}>
        {data && (
          <AspectRatio
            maxHeight={["100%"]}
            maxWidth={["100%"]}
            marginX={[8, "25%", 0]}
            ratio={3.6 / 5}
          >
            <PosterImage
              // style={{ filter: data.deathday && "grayscale(100%)" }}
              src={data.profile_path}
            />
          </AspectRatio>
        )}
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        {data && (
          <Box>
            <Box textTransform="uppercase" letterSpacing={2} marginY={2}>
              {data.deathday ? (
                <Text>
                  {data.deathday} (
                  {data.birthday ? countAge(data.birthday, data.deathday) : ""}{" "}
                  years)
                </Text>
              ) : (
                data.birthday && (
                  <Text>Age : {countAge(data.birthday)} years</Text>
                )
              )}
            </Box>
            <Text textAlign="justify">{data.biography}</Text>
          </Box>
        )}
      </Skeleton>
    </Grid>
  );
};

export default PersonDetailPage;
