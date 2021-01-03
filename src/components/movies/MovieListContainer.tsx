import {
  Box,
  Button,
  FormControl,
  Grid,
  Heading,
  Input,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import MoviesContainer from "./MoviesContainer";
import { ListType, useMovieList, MovieListReq } from "../../helpers/fetchHooks";
import { RawMovieListEntries } from "../../models/movies";

type MovieListContainerProps = {
  listMode: "section" | "search" | "discover";
};

const MovieListContainer = ({ listMode }: MovieListContainerProps) => {
  const router = useRouter();
  const {
    query: { section, page: qPage, query, genre },
  } = router;
  const page = qPage ? Number(qPage) : undefined;

  const [totalPages, setTotalPages] = useState<number>();
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const [queries, setQueries] = useState<MovieListReq>(undefined);

  useEffect(() => {
    if (page || query || genre) {
      switch (listMode) {
        case "section":
          setQueries({
            page: page,
          });
          break;
        case "search":
          setQueries({
            page: page,
            query: query as string,
          });
          break;
        case "discover":
          setQueries({
            page: page,
            with_genres: genre as string,
          });
          break;
        default:
          break;
      }
    }
  }, [page, query, genre]);

  const { data, isLoading } = useMovieList(
    listMode === "section" ? (section as ListType) : null,
    listMode === "search" ? shouldFetch : undefined,
    queries
  );

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (data && data.total_pages) {
      setTotalPages(data.total_pages);
    }
  }, [data]);

  useEffect(() => {
    if (
      (listMode === "search" && query) ||
      (listMode === "discover" && genre)
    ) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [listMode, query, genre]);

  const handleChangePage = (type: "next" | "prev") => () => {
    const changePageNum = type === "next" ? page + 1 : page - 1;

    const nextRoute = () => {
      switch (listMode) {
        case "section":
          return `/movies/${section}?page=${changePageNum}`;
        case "search":
          return `/movies/search?query=${query}&page=${changePageNum}`;
        case "discover":
          return `/movies/genre/${genre}?page=${changePageNum}`;
        default:
          return `/movies/${section}?page=${changePageNum}`;
      }
    };

    router.push(nextRoute());
  };

  const pageNavButtonProps: PageNavButtonProps = {
    isLoading,
    page,
    totalPages,
    results: data?.results,
    handleChangePage,
  };

  const generatePageHeadTitle = () => {
    switch (listMode) {
      case "section":
        return `${section} | muvees`;
      case "search":
        return `muvees | search: "${unescape(query as string)}"`;
    }
  };

  return (
    <Box mb={8} w="full" paddingX={8}>
      {data && (
        <Head>
          <title>{generatePageHeadTitle()}</title>
        </Head>
      )}
      <Button borderRadius={24} isFullWidth onClick={() => router.push("/")}>
        back
      </Button>

      {listMode === "search" && (
        <FormControl marginY={2}>
          <Input
            type="text"
            value={query || ""}
            onChange={(e) =>
              router.push(
                `/movies/search${
                  e.target.value && `?query=${e.target.value}&page=1`
                }`
              )
            }
            placeholder="Movie Title"
            borderRadius={24}
            fontSize="sm"
          />
        </FormControl>
      )}

      <Box marginY={8}>
        {listMode === "search" ? (
          shouldFetch ? (
            <>
              <PageNavButtons {...pageNavButtonProps} />
              <MoviesContainer
                movies={data && data.results}
                isLoading={isLoading}
              />
              <PageNavButtons {...pageNavButtonProps} />
            </>
          ) : null
        ) : (
          <>
            <Heading textTransform="capitalize">
              {section && (section as string).replace("_", " ")}
            </Heading>
            <PageNavButtons {...pageNavButtonProps} />
            <MoviesContainer
              movies={data && data.results}
              isLoading={isLoading}
            />
            <PageNavButtons {...pageNavButtonProps} />
          </>
        )}
      </Box>
    </Box>
  );
};

type PageNavButtonProps = {
  isLoading: boolean;
  page?: number;
  totalPages: number;
  results?: RawMovieListEntries["results"];
  handleChangePage: (type: "next" | "prev") => () => void;
};

const PageNavButtons = ({
  isLoading,
  results,
  page,
  totalPages,
  handleChangePage,
}: PageNavButtonProps) => {
  return (
    <Skeleton marginY={4} isLoaded={!isLoading}>
      {results?.length ? (
        <Grid rowGap={4}>
          <Text
            letterSpacing={2}
            textTransform="uppercase"
            textAlign="center"
            marginY={2}
            fontSize="sm"
          >
            Page: {page && <b>{page}</b>} / {totalPages}
          </Text>

          <Grid templateColumns={["repeat(2, 1fr)"]} gap={4}>
            <Button disabled={page === 1} onClick={handleChangePage("prev")}>
              prev
            </Button>
            <Button
              disabled={page === totalPages}
              onClick={handleChangePage("next")}
            >
              next
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Skeleton>
  );
};

export default MovieListContainer;
