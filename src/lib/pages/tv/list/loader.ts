import type { GetStaticProps } from "next";

import { getTVShowByListType } from "lib/services/tmdb/tv/list";
import type { TVShowListType } from "lib/services/tmdb/tv/list/types";
import { TVShowList } from "lib/services/tmdb/tv/list/types";

import type { TVShowListPageProps, TVShowListPageParams } from "./types";

export { getStaticPaths } from "lib/utils/defaultGetStaticPaths";

export const getStaticProps: GetStaticProps<
  TVShowListPageProps,
  TVShowListPageParams
> = async (ctx) => {
  const { params } = ctx;

  if (!params?.listType || !(params.listType in TVShowList)) {
    return {
      notFound: true,
    };
  }

  const listType = params.listType as TVShowListType;
  const data = await getTVShowByListType(listType);

  return {
    props: {
      data,
      listType,
    },
    revalidate: 86400,
  };
};
