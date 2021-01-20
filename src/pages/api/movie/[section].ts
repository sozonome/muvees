import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { API_URL } from "../../../constants/movieDBapi";

const section = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query,
  } = req;

  await axios
    .get(`${API_URL}/search/movie`, {
      params: {
        ...query,
        api_key: process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    .then(({ data }) => {
      res.statusCode = 200;
      res.json(data);
    })
    .catch(() => {
      res.statusCode = 400;
      res.json([]);
    });
};

export default section;
