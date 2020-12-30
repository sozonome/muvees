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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import MoviesContainer from "./MoviesContainer";
import { ListType, useMovieList } from "../../helpers/fetchHooks";
import { RawEntries } from "../../models/movies";

type MovieListContainerProps = {
  listMode: "section" | "search";
};

const MovieListContainer = ({ listMode }: MovieListContainerProps) => {
  const router = useRouter();
  const {
    query: { section, page: qPage, query },
  } = router;
  const page = Number(qPage);

  const [totalPages, setTotalPages] = useState<number>();
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const { data, isLoading } = useMovieList({
    page,
    section: section as ListType,
    query: query as string,
    ...(listMode === "search" && { shouldFetch }),
  });

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
    if (listMode === "search" && query) {
      setShouldFetch(true);
    }
  }, [listMode, query]);

  const handleChangePage = (type: "next" | "prev") => () => {
    const changePageNum = type === "next" ? page + 1 : page - 1;

    router.push(
      listMode === "section"
        ? `/movies/${section}?page=${changePageNum}`
        : `/movies/search?query=${query}&page=${changePageNum}`
    );
  };

  const pageNavButtonProps: PageNavButtonProps = {
    isLoading,
    page,
    totalPages,
    results: data?.results,
    handleChangePage,
  };

  return (
    <Box mb={8} w="full" paddingX={8}>
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
  page: number;
  totalPages: number;
  results?: RawEntries["results"];
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
        <>
          <Text textAlign="center" marginY={2}>
            Page: <b>{page}</b> / {totalPages}
          </Text>
          <Grid templateColumns={["repeat(2, 1fr)"]} gap={4}>
            <Button
              borderRadius={24}
              disabled={page === 1}
              onClick={handleChangePage("prev")}
            >
              prev
            </Button>
            <Button
              borderRadius={24}
              disabled={page === totalPages}
              onClick={handleChangePage("next")}
            >
              next
            </Button>
          </Grid>
        </>
      ) : null}
    </Skeleton>
  );
};

export default MovieListContainer;
