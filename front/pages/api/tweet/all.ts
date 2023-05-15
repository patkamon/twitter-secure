import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const response = await axios.get("http://twitter-secure-nginx-proxy-1:80/tweet/all");
      if (response.data.status) {
        return res
          .status(response.data.status)
          .send({ message: response.data.msg });
      }
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    return res.status(405).send({ message: "Method Not Allowed" });
  }
}
