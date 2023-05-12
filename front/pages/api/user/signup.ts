import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "js-cookie"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const response = await axios.post(
        "http://secure-proj_nginx-proxy_1:80/user/signup",
        req.body
      );
      if (response.data.status) {
        console.log("cookie csrf",response.data.csrf,response.data )
        cookie.set("csrf", response.data.csrf)
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
