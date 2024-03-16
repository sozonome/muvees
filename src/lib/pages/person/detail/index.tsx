import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Heading,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { BionifiedParagraph } from 'lib/components/BionifiedParagraph';
import PosterImage from 'lib/components/shared/PosterImage';
import { usePersonDetail } from 'lib/services/tmdb/person/detail';
import { countAge } from 'lib/utils/countAge';

const PersonDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = usePersonDetail(Number(id));

  return (
    <Grid marginX={8} gap={8}>
      <Button onClick={router.back}>back</Button>

      <Skeleton isLoaded={!!data}>
        <Box
          display={{ base: 'grid', md: 'flex' }}
          alignItems="start"
          gap={{ base: 8, md: 16 }}
        >
          {data && (
            <AspectRatio
              minWidth={{ md: 300 }}
              marginX={[8, '25%', 0]}
              ratio={3.6 / 5}
            >
              <PosterImage
                // style={{ filter: data.deathday && "grayscale(100%)" }}
                src={data.profile_path}
              />
            </AspectRatio>
          )}

          <Box>
            {data && (
              <Heading
                textAlign={['center', 'center', 'inherit']}
                size="lg"
                letterSpacing={2}
                textTransform="uppercase"
                fontWeight="extrabold"
                marginX={[8, 8, 0]}
              >
                {data.name}
              </Heading>
            )}

            {data && (
              <Grid gap={4}>
                <Box
                  textTransform="uppercase"
                  letterSpacing={2}
                  marginY={2}
                  fontSize="xs"
                  fontWeight="light"
                >
                  {data.deathday ? (
                    <Text>
                      {data.deathday} (
                      {data.birthday
                        ? countAge(data.birthday, data.deathday)
                        : ''}{' '}
                      years)
                    </Text>
                  ) : (
                    data.birthday && (
                      <Text>Age : {countAge(data.birthday)} years</Text>
                    )
                  )}
                </Box>
                <BionifiedParagraph
                  fontSize={{ base: 'sm', md: 'md' }}
                  lineHeight={1.75}
                >
                  {data.biography}
                </BionifiedParagraph>
              </Grid>
            )}
          </Box>
        </Box>
      </Skeleton>
    </Grid>
  );
};

export default PersonDetailPage;
