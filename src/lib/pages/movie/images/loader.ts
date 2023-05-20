import type { GetStaticProps } from 'next';

import { getMovieImagesServer } from 'lib/services/tmdb/movie/images';

import type { MovieImagesPageParams, MovieImagesPageProps } from './types';

export { getStaticPaths } from 'lib/utils/defaultGetStaticPaths';

export const getStaticProps: GetStaticProps<
  MovieImagesPageProps,
  MovieImagesPageParams
> = async (ctx) => {
  const { params } = ctx;

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const id = Number(params.id);

  const data = await getMovieImagesServer(id);

  return {
    props: {
      data,
    },
    revalidate: 86400,
  };
};
