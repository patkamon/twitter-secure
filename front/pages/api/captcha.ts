import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const response = await axios.post(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        { secret: process.env.NEXT_PUBLIC_TURNSTILE_SECRET_KEY, response: req.body.token }
      );
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(502).send(error);
    }
  } else {
    return res.status(405).send({ message: "Method Not Allowed" });
  }
}
