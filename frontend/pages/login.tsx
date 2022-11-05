import {
  useSession,
  signIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";

const signOut = async () => {
  // We want to also sign out from Keycloak
  const response = await fetch("/api/auth/keycloak-logout");

  if (response.ok) {
    const { path } = await response.json();

    nextAuthSignOut({ redirect: false });

    window.location.href = path;
  } else {
    console.error("Failed to sign out: %s", response.body);
  }
};

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
