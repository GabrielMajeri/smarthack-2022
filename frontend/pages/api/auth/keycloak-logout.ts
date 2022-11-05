import { NextApiRequest, NextApiResponse } from "next";
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM_URL } from "./[...nextauth]";

type Data = {
  path: string;
};

const POST_LOGOUT_REDIRECT_URI = encodeURIComponent(
  process.env.NEXTAUTH_URL ?? "http://localhost:3000/"
);

export default async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  const path = `${KEYCLOAK_REALM_URL}/protocol/openid-connect/logout?post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}&client_id=${KEYCLOAK_CLIENT_ID}`;

  res.status(200).json({ path });
};
