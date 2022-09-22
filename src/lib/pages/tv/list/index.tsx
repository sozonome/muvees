import { Grid } from "@chakra-ui/react";

import { useTVShowByList } from "lib/services/tmdb/tv/list";

const TVShowList = () => {
  const { data } = useTVShowByList({ listType: "popular" });

  if (!data) {
    return null;
  }

  return (
    <Grid paddingX={8}>
      {data.results.map((show) => (
        <p>{show.name}</p>
      ))}
    </Grid>
  );
};

export default TVShowList;
