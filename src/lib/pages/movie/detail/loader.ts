import type { GetStaticProps } from 'next';

import { getMovieCreditsServer } from 'lib/services/tmdb/movie/credits';
import { getMovieDetailServer } from 'lib/services/tmdb/movie/detail';

import type { MovieDetailPageParams, MovieDetailPageProps } from './types';

export { getStaticPaths } from 'lib/utils/defaultGetStaticPaths';

export const getStaticProps: GetStaticProps<
  MovieDetailPageProps,
  MovieDetailPageParams
> = async (ctx) => {
  const { params } = ctx;

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  try {
    const id = Number(params.id);
    const detailData = await getMovieDetailServer(id);
    const creditsData = await getMovieCreditsServer(id);

    return {
      props: {
        detailData,
        creditsData,
      },
      revalidate: 604800,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
