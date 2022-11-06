import type { NextApiRequest, NextApiResponse } from "next";
import { FLOWS_MICROSERVICE_URL } from "../../../utils/api";

type Data = string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { flowId, formNodeId } = req.body;

  // Create a new instance for this flow
  const response = await fetch(
    `${FLOWS_MICROSERVICE_URL}/flows/${flowId}/instances`,
    { method: "POST" }
  );

  if (!response.ok) {
    res
      .status(500)
      .send(
        `Error: received error ${response.status} while trying to create new flow instance`
      );
    return;
  }

  const data = await response.json();
  console.log(data);

  res.status(200).send("OK");
}
