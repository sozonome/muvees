import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useMultiSearchResult } from "lib/services/tmdb/search/multi";

const MultiSearchPage = () => {
  const router = useRouter();
  const {
    // asPath,
    query: { page: qPage, query: qQuery },
  } = router;
  const page = qPage && Number(qPage) > 0 ? Number(qPage) : 1;
  const query = qQuery as string;

  // const queryParams = new URL(asPath).searchParams;

  const { data, isLoading } = useMultiSearchResult(
    {
      page,
      query,
    },
    query?.length > 0
  );

  if (isLoading) {
    return <Spinner />;
  }

  return <div>{data?.results.map((item) => item.id)}</div>;
};

export default MultiSearchPage;
