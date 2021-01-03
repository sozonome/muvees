import {
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Flex,
  FormControl,
  Grid,
  Heading,
  Input,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiLinkExternal } from "react-icons/bi";
import { FaImdb } from "react-icons/fa";
import { ChangeEvent, useState } from "react";

import Error from "../../components/layout/Error";

import PosterImage, { IMAGE_URL } from "../../components/movies/PosterImage";
import { convertToPrice } from "../../helpers/convertToPrice";
import { useMovieCreditsData, useMovieData } from "../../helpers/fetchHooks";
import { MovieCreditsType } from "../../models/movies";

const Movie = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, isLoading, isError } = useMovieData({ id: Number(id) });
  const {
    data: credits,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useMovieCreditsData({
    id: Number(id),
  });

  const { colorMode } = useColorMode();

  const statusColorScheme = () => {
    if (data) {
      switch (data.status) {
        case "Rumored":
          return "orange";
        case "Planned":
          return "teal";
        case "In Production":
          return "blue";
        case "Post Production":
          return "purple";
        case "Released":
          return "green";
        case "Canceled":
          return "red";
        default:
          return null;
      }
    }
  };

  if (isError) {
    return <Error />;
  }

  return (
    <Grid
      templateColumns={["repeat(1)", "repeat(1)", "repeat(2, minmax(0,1fr))"]}
      wrap="wrap"
      paddingX={8}
      gridGap={[8, 16]}
    >
      <Grid rowGap={8} flexBasis={["100%"]}>
        <Button
          borderRadius={24}
          onClick={() => router.back()}
          width={["full", "full", 100]}
        >
          back
        </Button>

        <Skeleton isLoaded={!isLoading} minHeight={isLoading ? 16 : null}>
          <Heading
            textAlign={["center", "center", "inherit"]}
            fontSize="md"
            letterSpacing={2}
            textTransform="uppercase"
            fontWeight="300"
            marginX={[8, 8, 0]}
          >
            {data && data.title}
          </Heading>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} maxHeight={["auto"]}>
          <AspectRatio
            ratio={3.6 / 5}
            maxHeight={["100%"]}
            maxWidth={["100%"]}
            marginX={[8, "25%", 0]}
          >
            <PosterImage src={data && data.poster_path} />
          </AspectRatio>
          {data && data.tagline && (
            <Text
              textAlign={["center", "center", "inherit"]}
              fontSize="0.7rem"
              fontWeight="500"
              letterSpacing={2}
              textTransform="uppercase"
              marginTop={4}
              marginX={[8, 8, 0]}
            >
              {data.tagline}
            </Text>
          )}
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          {data && (
            <Flex gridColumnGap={2} alignItems="center">
              <Badge
                variant={colorMode === "light" ? "solid" : "outline"}
                colorScheme={statusColorScheme()}
              >
                {data.status}
              </Badge>

              <Text textTransform="uppercase" letterSpacing={1} fontSize="xs">
                {data.runtime ? `${data.runtime} min. / ` : null}{" "}
                {new Date(data.release_date).getFullYear()}
              </Text>
            </Flex>
          )}
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          {data && data.genres && (
            <Flex wrap="wrap" gridGap={2}>
              {data.genres.map((genre, index) => (
                <Link href={`/movies/genre/${genre.id}?page=1`}>
                  <Badge
                    cursor="pointer"
                    variant={colorMode === "light" ? "solid" : "outline"}
                    colorScheme="gray"
                    key={index}
                  >
                    {genre.name}
                  </Badge>
                </Link>
              ))}
            </Flex>
          )}
        </Skeleton>
      </Grid>

      <Grid
        rowGap={8}
        alignItems="center"
        templateColumns="minmax(0,1fr)"
        flexBasis={["100%"]}
      >
        <Skeleton isLoaded={!isLoading}>
          <Text textAlign="justify">{data && data.overview}</Text>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          {data && (
            <Flex gridColumnGap={2}>
              {data.homepage && (
                <ChakraLink _hover={undefined} href={data.homepage} isExternal>
                  <Button size="sm" leftIcon={<BiLinkExternal />}>
                    website
                  </Button>
                </ChakraLink>
              )}
              {data.imdb_id && (
                <ChakraLink
                  href={`https://www.imdb.com/title/${data.imdb_id}`}
                  isExternal
                >
                  <Button size="sm" leftIcon={<FaImdb />}>
                    IMDB
                  </Button>
                </ChakraLink>
              )}
            </Flex>
          )}
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <Heading fontSize="lg">Achievements</Heading>

          {data && (
            <Grid
              gridGap={1}
              textTransform={"uppercase"}
              letterSpacing={2}
              fontSize="sm"
            >
              <Text>
                Revenue:{" "}
                <Text as="span" fontWeight="bold" letterSpacing={0}>
                  {convertToPrice(data.revenue)}
                </Text>
              </Text>
              <Text>
                Rating : <b>{data.vote_average}</b>{" "}
                <Text as="span" fontSize="xs">
                  {" "}
                  ({data.vote_count} voted)
                </Text>
              </Text>
            </Grid>
          )}
        </Skeleton>

        <CastsWrapper isLoadingCredits={isLoadingCredits} credits={credits} />
      </Grid>
    </Grid>
  );
};

type CastsWrapperProps = {
  isLoadingCredits: boolean;
  credits: MovieCreditsType;
};

const CastsWrapper = ({ isLoadingCredits, credits }: CastsWrapperProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [keyword, setKeyword] = useState<string>("");

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value);

  return (
    <Skeleton isLoaded={!isLoadingCredits}>
      {credits && (
        <Flex alignItems="center" gridGap={3} minHeight={24} overflowX="scroll">
          <Button padding={8} borderRadius="50%" onClick={onOpen}>
            all
          </Button>
          {credits.cast.slice(0, 20).map((movieCast, index) => (
            <Link href={`/person/${movieCast.id}`} key={index}>
              <Avatar
                cursor="pointer"
                size="lg"
                src={`${IMAGE_URL}${movieCast.profile_path}`}
                name={movieCast.name}
              />
            </Link>
          ))}
          <Button padding={8} borderRadius="50%" onClick={onOpen}>
            more
          </Button>

          <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
          >
            <ModalOverlay />

            <ModalContent>
              <ModalHeader>
                <Heading>Casts</Heading>
                <FormControl marginY={2}>
                  <Input
                    type="text"
                    placeholder="search"
                    value={keyword}
                    onChange={handleChangeKeyword}
                  />
                </FormControl>
              </ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Grid gap={4} templateColumns={["repeat(1, 1fr)"]}>
                  {credits.cast
                    .filter(
                      (unfilteredCast) =>
                        unfilteredCast.name
                          .toLowerCase()
                          .indexOf(keyword.toLowerCase()) > -1
                    )
                    .map((movieCast, index) => (
                      <Link href={`/person/${movieCast.id}`} key={index}>
                        <Flex
                          cursor="pointer"
                          alignItems="center"
                          gridColumnGap={2}
                        >
                          <Avatar
                            size="lg"
                            name={movieCast.name}
                            src={`${IMAGE_URL}${movieCast.profile_path}`}
                          />
                          <Text>{movieCast.name}</Text>
                        </Flex>
                      </Link>
                    ))}
                </Grid>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      )}
    </Skeleton>
  );
};

export default Movie;
