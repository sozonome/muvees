import {
  AspectRatio,
  Button,
  Grid,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import PosterImage from "../../components/movies/PosterImage";

import { usePersonData } from "../../helpers/fetchHooks";

const Person = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, isLoading } = usePersonData({ id: Number(id) });

  return (
    <Grid marginX={8} gap={8}>
      <Button borderRadius={24} onClick={() => router.back()}>
        back
      </Button>

      <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : null}>
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

      <Skeleton isLoaded={!isLoading} maxHeight={["auto"]}>
        {data && (
          <AspectRatio
            maxHeight={["100%"]}
            maxWidth={["100%"]}
            marginX={[8, "25%", 0]}
            ratio={3.6 / 5}
          >
            <PosterImage src={data.profile_path} />
          </AspectRatio>
        )}
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        {data && <Text textAlign="justify">{data.biography}</Text>}
      </Skeleton>
    </Grid>
  );
};

export default Person;
