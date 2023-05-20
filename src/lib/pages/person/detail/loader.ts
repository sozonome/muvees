import type { GetStaticProps } from 'next';

import { getPersonDetailServer } from 'lib/services/tmdb/person/detail';

import type { PersonDetailPageParams, PersonDetailPageProps } from './types';

export { getStaticPaths } from 'lib/utils/defaultGetStaticPaths';

export const getStaticProps: GetStaticProps<
  PersonDetailPageProps,
  PersonDetailPageParams
> = async (ctx) => {
  const { params } = ctx;

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  try {
    const id = Number(params.id);
    const data = await getPersonDetailServer(id);

    return {
      props: {
        data,
      },
      revalidate: 86400,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
