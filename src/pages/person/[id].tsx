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

import PosterImage from "components/movies/PosterImage";
import { countAge } from "utils/countAge";
import { usePersonData } from "utils/fetchHooks";

const Person = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, isLoading } = usePersonData({ id: Number(id) });

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

export default Person;
