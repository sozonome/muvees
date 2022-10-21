import { Button, Grid, Heading, Spinner } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import TvShowDetailMeta from "lib/components/tv/detail/TvDetailMeta";
import { useTvShowDetail } from "lib/services/tmdb/tv/detail";
import { handleRouteBack } from "lib/utils/handleRouteBack";

import type { TvShowDetailPageProps } from "./types";

const TvShowDetailPage = ({
  data: fallbackData,
  id,
}: TvShowDetailPageProps) => {
  const router = useRouter();
  const { data, isLoading } = useTvShowDetail(id, fallbackData);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <Heading>No Data</Heading>;
  }

  return (
    <Grid paddingX={8} gridGap={[8, 16]}>
      <NextSeo title={data.name} description={data.tagline} />

      <Grid rowGap={8} flexBasis={["100%"]}>
        <Button onClick={handleRouteBack(router)} width={["full", "full", 100]}>
          back
        </Button>

        <TvShowDetailMeta data={data} />
      </Grid>
    </Grid>
  );
};

export default TvShowDetailPage;
