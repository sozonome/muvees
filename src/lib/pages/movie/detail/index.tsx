import { Button, Grid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import MovieDetailAdditionalInfo from "lib/components/movie/detail/AdditionalInfo";
import CastsWrapper from "lib/components/movie/detail/CastsWrapper";
import MovieDetailMeta from "lib/components/movie/detail/Meta";
import Error from "lib/layout/Error";
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

  if (isError || !data) {
    return <Error />;
  }

  return (
    <Grid paddingX={8} gridGap={[8, 16]}>
      <NextSeo title={data.title} />

      <Grid rowGap={8} flexBasis={["100%"]}>
        <Button onClick={handleRouteBack(router)} width={["full", "full", 100]}>
          back
        </Button>

        <MovieDetailMeta isLoading={isLoading} data={data} />
      </Grid>

      <Grid
        gap={8}
        alignItems="center"
        templateColumns={{ base: "minmax(0, 1fr)", md: "1fr minmax(0, 2fr)" }}
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
