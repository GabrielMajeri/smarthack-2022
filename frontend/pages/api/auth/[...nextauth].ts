import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";

const KEYCLOAK_HOST = "http://localhost:8000";
export const KEYCLOAK_CLIENT_ID = "admin-dashboard";
export const KEYCLOAK_REALM_URL = `${KEYCLOAK_HOST}/realms/autoflow`;

const KEYCLOAK_WELL_KNOWN_URL =
  "http://localhost:8000/realms/autoflow/.well-known/openid-configuration";

export const authOptions = {
  providers: [
    {
      id: "keycloak",
      name: "Keycloak",
      type: "oauth",
      wellKnown: KEYCLOAK_WELL_KNOWN_URL,
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      clientId: KEYCLOAK_CLIENT_ID,
      // Configure PKCE-based login, without using a client secret.
      checks: ["pkce"],
      client: {
        token_endpoint_auth_method: "none",
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
        };
      },
    } as Provider,
  ],
};

export default NextAuth(authOptions);
