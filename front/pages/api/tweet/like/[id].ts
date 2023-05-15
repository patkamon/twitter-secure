import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method == "PUT") {
    try {
      const response = await axios.put(`http://twitter-secure-nginx-proxy-1:80/tweet/like/${id}`, req.body,  {
        headers: {
          Authorization: req.headers.authorization,
          csrf: req.headers.csrf,
        },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  } else {
    return res.status(405).send({ message: "Method Not Allowed" });
  }
}
