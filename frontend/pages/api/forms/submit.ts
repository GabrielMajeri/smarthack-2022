import type { NextApiRequest, NextApiResponse } from "next";

type Data = string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Received form submission with data:", req.body);

  res.status(200);
}
