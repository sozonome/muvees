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
} from '@chakra-ui/react';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useState, useMemo } from 'react';

import { IMAGE_URL } from 'lib/components/shared/PosterImage';
import type { MovieCreditsResponse } from 'lib/services/tmdb/movie/credits/types';

type CastsWrapperProps = {
  isLoadingCredits?: boolean;
  credits?: MovieCreditsResponse;
};

const CastsWrapper = ({ isLoadingCredits, credits }: CastsWrapperProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [keyword, setKeyword] = useState<string>('');

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value);

  const casts = useMemo(() => {
    if (credits) {
      return credits.cast
        .filter(
          (unfilteredCast) =>
            unfilteredCast.name.toLowerCase().indexOf(keyword.toLowerCase()) >
            -1
        )
        .map((movieCast) => (
          <Flex
            as={Link}
            href={`/person/${movieCast.id}`}
            key={`${movieCast.name}-${movieCast.id}`}
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
        ));
    }

    return [];
  }, [credits, keyword]);

  return (
    <Skeleton isLoaded={!isLoadingCredits}>
      {credits && (
        <Flex alignItems="center" gridGap={3} minHeight={24} overflowX="scroll">
          <Button padding={8} borderRadius="50%" onClick={onOpen}>
            all
          </Button>
          {credits.cast.slice(0, 20).map((movieCast) => (
            <Avatar
              as={Link}
              href={`/person/${movieCast.id}`}
              key={`${movieCast.name}-${movieCast.id}`}
              cursor="pointer"
              size="lg"
              src={`${IMAGE_URL}${movieCast.profile_path}`}
              name={movieCast.name}
            />
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
                <Grid gap={4} templateColumns={['repeat(1, 1fr)']}>
                  {casts}
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
