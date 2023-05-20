import type { GetStaticProps } from 'next';

import type { HomePageProps } from 'lib/pages/home/types';
import { getMovieListServer } from 'lib/services/tmdb/movie/list';
import { getTVShowByListType } from 'lib/services/tmdb/tv/list';

// eslint-disable-next-line import/prefer-default-export
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const popularMovieData = await getMovieListServer('popular');
    const popularTvShowData = await getTVShowByListType('popular');

    return {
      props: {
        popularMovieData,
        popularTvShowData,
      },
      revalidate: 43200,
    };
  } catch {
    return { notFound: true };
  }
};
