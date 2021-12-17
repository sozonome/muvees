import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, ChangeEvent } from "react";

import { IMAGE_URL } from "components/movie/PosterImage";
import { MovieCreditsResponse } from "services/tmdb/movie/credits/types";

type CastsWrapperProps = {
  isLoadingCredits: boolean;
  credits?: MovieCreditsResponse;
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
          {credits.cast.slice(0, 20).map((movieCast) => (
            <Link
              href={`/person/${movieCast.id}`}
              key={`${movieCast.name}-${movieCast.id}`}
              passHref
            >
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
                    .map((movieCast) => (
                      <Link
                        href={`/person/${movieCast.id}`}
                        key={`${movieCast.name}-${movieCast.id}`}
                        passHref
                      >
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

              <ModalFooter />
            </ModalContent>
          </Modal>
        </Flex>
      )}
    </Skeleton>
  );
};

export default CastsWrapper;
