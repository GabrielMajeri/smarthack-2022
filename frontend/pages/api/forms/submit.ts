import type { NextApiRequest, NextApiResponse } from "next";
import {
  EXECUTOR_MICROSERVICE_URL,
  FLOWS_MICROSERVICE_URL,
  FORMS_MICROSERVICE_URL,
} from "../../../utils/api";

type Data = string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);

  const { flowId, formNodeId } = body;

  // Create a new instance for this flow
  const flowInstanceDto = {
    parentFlowId: flowId,
    parentFormNodeId: formNodeId,
  };
  let requestOptions = {
    method: "POST",
    body: JSON.stringify(flowInstanceDto),
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(
    `${FLOWS_MICROSERVICE_URL}/flows/${flowId}/instances`,
    requestOptions
  );

  if (!response.ok) {
    res
      .status(500)
      .send(
        `Error: received error ${response.status} while trying to create new flow instance`
      );
    return;
  }

  const { id: flowInstanceId } = await response.json();
  console.log("Created new flow instance with ID %s", flowInstanceId);

  const formFields = {
    ...body,
    flowId: undefined,
    formNodeId: undefined,
  };
  const formDataDto = {
    flowId,
    flowInstanceId,
    formNodeId,
    data: formFields,
  };
  requestOptions = {
    method: "POST",
    body: JSON.stringify(formDataDto),
    headers: {
      "Content-Type": "application/json",
    },
  };
  response = await fetch(
    `${FORMS_MICROSERVICE_URL}/forms/submit`,
    requestOptions
  );

  if (!response.ok) {
    res
      .status(500)
      .send(
        `Error: received error ${response.status} while trying to save form data`
      );
  }

  const { id: formOutputId } = await response.json();
  console.log("Saved form data with ID %s", formOutputId);

  res.status(200).send("OK");

  const nodeExecutionFinishDto = {
    flowId,
    flowInstanceId,
    nodeId: formNodeId,
    result: {
      status: "success",
      output: formFields,
    },
  };
  requestOptions = {
    method: "POST",
    body: JSON.stringify(nodeExecutionFinishDto),
    headers: {
      "Content-Type": "application/json",
    },
  };
  response = await fetch(
    `${EXECUTOR_MICROSERVICE_URL}/executor/onNodeExecutionFinish`,
    requestOptions
  );
}
