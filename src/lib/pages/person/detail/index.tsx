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

import { BionifiedParagraph } from "lib/components/BionifiedParagraph";
import PosterImage from "lib/components/shared/PosterImage";
import { usePersonDetail } from "lib/services/tmdb/person/detail";
import { countAge } from "lib/utils/countAge";

import type { PersonDetailPageProps } from "./types";

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

      <Box display={{ base: "grid", md: "flex" }} gap={{ base: 8, md: 16 }}>
        <Skeleton isLoaded={!isLoading} maxHeight={["auto"]}>
          {data && (
            <AspectRatio
              maxHeight={["100%"]}
              maxWidth={["100%"]}
              minWidth={{ md: 300 }}
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

        <Box>
          <Skeleton
            isLoaded={!isLoading}
            minHeight={isLoading ? 16 : undefined}
            marginBottom={6}
          >
            {data && (
              <Heading
                textAlign={["center", "center", "inherit"]}
                size="lg"
                letterSpacing={2}
                textTransform="uppercase"
                fontWeight="extrabold"
                marginX={[8, 8, 0]}
              >
                {data.name}
              </Heading>
            )}
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            {data && (
              <Grid gap={4}>
                <Box
                  textTransform="uppercase"
                  letterSpacing={2}
                  marginY={2}
                  fontSize="xs"
                  fontWeight="light"
                >
                  {data.deathday ? (
                    <Text>
                      {data.deathday} (
                      {data.birthday
                        ? countAge(data.birthday, data.deathday)
                        : ""}{" "}
                      years)
                    </Text>
                  ) : (
                    data.birthday && (
                      <Text>Age : {countAge(data.birthday)} years</Text>
                    )
                  )}
                </Box>
                <BionifiedParagraph
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight={1.75}
                >
                  {data.biography}
                </BionifiedParagraph>
              </Grid>
            )}
          </Skeleton>
        </Box>
      </Box>
    </Grid>
  );
};

export default PersonDetailPage;
