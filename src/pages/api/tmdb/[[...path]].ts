import { NextApiRequest, NextApiResponse } from "next";

import { TMDB_API_KEY, TMDB_API_URL } from "lib/services/tmdb/constants";
import { fetcher } from "lib/utils/fetcher";

const tmdbAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { path, ...params },
  } = req;

  res.json(
    await fetcher(`${TMDB_API_URL}/${(path as string[]).join("/")}`, {
      ...params,
      api_key: TMDB_API_KEY,
    })
  );
};

export default tmdbAPI;
