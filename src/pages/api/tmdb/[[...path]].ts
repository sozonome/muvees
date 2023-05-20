import type { NextApiRequest, NextApiResponse } from 'next';

import { tmdbServerFetcher } from 'lib/services/tmdb/utils';

const tmdbAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { path, ...params },
  } = req;

  const requestPath = `/${(path as string[]).join('/')}`;

  const data = await tmdbServerFetcher(requestPath, params);

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=600');
  res.json(data);
};

export default tmdbAPI;
