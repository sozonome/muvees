import type { GetStaticProps } from 'next';

import { getTvShowDetail } from 'lib/services/tmdb/tv/detail';

import type { TvShowDetailPageProps } from './types';

export { getStaticPaths } from 'lib/utils/defaultGetStaticPaths';

export const getStaticProps: GetStaticProps<TvShowDetailPageProps> = async (
  ctx
) => {
  const { params } = ctx;

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  try {
    const id = params.id as string;
    const data = await getTvShowDetail(id);

    return {
      props: {
        data,
        id,
      },
    };
  } catch {
    return { notFound: true };
  }
};
