import { Button, Grid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Error from "lib/components/layout/Error";
import MovieDetailAdditionalInfo from "lib/components/movie/detail/AdditionalInfo";
import CastsWrapper from "lib/components/movie/detail/CastsWrapper";
import MovieDetailMeta from "lib/components/movie/detail/Meta";
import { useMovieCredits } from "lib/services/tmdb/movie/credits";
import { useMovieDetail } from "lib/services/tmdb/movie/detail";
import { handleRouteBack } from "lib/utils/handleRouteBack";

import type { MovieDetailPageProps } from "./types";

const MovieDetailPage = ({
  detailFallbackData,
  creditFallbackData,
}: MovieDetailPageProps) => {
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

  const { data, isLoading, isError } = useMovieDetail(
    movieId ?? 0,
    detailFallbackData,
    !!movieId
  );

  const { data: credits, isLoading: isLoadingCredits } = useMovieCredits(
    movieId ?? 0,
    creditFallbackData,
    !!movieId
  );

  if (isError) {
    return <Error />;
  }

  return (
    <Grid
      templateColumns={["repeat(1)", "repeat(1)", "repeat(2, minmax(0,1fr))"]}
      paddingX={8}
      gridGap={[8, 16]}
    >
      <NextSeo title={`${data?.title} | muvees`} />

      <Grid rowGap={8} flexBasis={["100%"]}>
        <Button onClick={handleRouteBack(router)} width={["full", "full", 100]}>
          back
        </Button>

        <MovieDetailMeta isLoading={isLoading} data={data} />
      </Grid>

      <Grid
        rowGap={8}
        alignItems="center"
        templateColumns="minmax(0,1fr)"
        flexBasis={["100%"]}
      >
        <MovieDetailAdditionalInfo
          isLoading={isLoading}
          data={data}
          id={movieId ?? 0}
        />

        <CastsWrapper isLoadingCredits={isLoadingCredits} credits={credits} />
      </Grid>
    </Grid>
  );
};

export default MovieDetailPage;
