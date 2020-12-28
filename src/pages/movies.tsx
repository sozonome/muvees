import { Box } from "@chakra-ui/react";
import { useState } from "react";
import MoviesContainer from "../components/movies/MoviesContainer";
import { useMovieList, ListType } from "../helpers/fetchHooks";

const Home = () => {
  const [section, setSection] = useState<ListType>();
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useMovieList({ page, section });

  return (
    <Box mb={8} w="full" paddingX={8}>
      <MoviesContainer movies={data && data.results} />
    </Box>
  );
};

export default Home;
