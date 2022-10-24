import type { NextApiRequest, NextApiResponse } from "next";

import { tmdbServerFetcher } from "lib/services/tmdb/utils";

const tmdbAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { path, ...params },
  } = req;

  const requestPath = `/${(path as string[]).join("/")}`;

  res.setHeader(
    "Cache-Control",
    "s-maxage=600, stale-while-revalidate=2678400"
  );
  res.json(await tmdbServerFetcher(requestPath, params));
};

export default tmdbAPI;
