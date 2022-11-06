import {
  Text,
  Container,
  Anchor,
  MediaQuery,
  Button,
  Image,
  Grid,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { MdOutlineArrowDownward } from "react-icons/md";
import { Link } from "react-scroll";
import {
  useSession,
  signIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import Router from "next/router";

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

const About = () => {
  const theme = useMantineTheme();
  const { data: session } = useSession();

  if (session) {
    return (
      <section id="about">
        <Container fluid>
          <div className="about-content">
            <Center>
              <Image src="/logo.png" style={{ width: "50%" }} />
            </Center>

            {/* <div style={{ marginBottom: 15 }}>
                        <Text transform="uppercase" weight={500} color="yellow">
                            MADE WITH REACT AND MANTINE
                        </Text>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <Text>
                            <MediaQuery query="(max-width: 768px)" styles={{ fontSize: '2.8rem !important' }}>
                                <h1 className="title">Simple Mantine Template</h1>
                            </MediaQuery>
                        </Text>
                    </div> */}

            <div style={{ marginBottom: 25 }}>
              <Text size="xl" color="black">
                Debirocratizarea domeniului public din România prin soluții
                digitale simple.
              </Text>
            </div>

            <div style={{ marginBottom: 15 }}>
              <Text
                size="lg"
                style={{ color: "var(--custom-red)", fontSize: "1.5rem" }}
              >
                Bine ai venit, {session.user?.name} !
              </Text>
            </div>

            <div className="buttons">
              <Link to="section-four" smooth duration={500}>
                <Button
                  style={{ background: "var(--custom-red)" }}
                  rightIcon={<MdOutlineArrowDownward size={16} />}
                  radius="lg"
                  size="md"
                >
                  Despre noi
                </Button>
              </Link>

              <Button
                variant="default"
                radius="lg"
                size="md"
                onClick={() => signOut()}
              >
                Deconectare
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  } else {
    return (
      <section id="about">
        <Container fluid>
          <div className="about-content">
            <Center>
              <Image src="/logo.png" style={{ width: "50%" }} />
            </Center>

            {/* <div style={{ marginBottom: 15 }}>
                        <Text transform="uppercase" weight={500} color="yellow">
                            MADE WITH REACT AND MANTINE
                        </Text>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <Text>
                            <MediaQuery query="(max-width: 768px)" styles={{ fontSize: '2.8rem !important' }}>
                                <h1 className="title">Simple Mantine Template</h1>
                            </MediaQuery>
                        </Text>
                    </div> */}

            <div style={{ marginBottom: 25 }}>
              <Text size="xl" color="black">
                Debirocratizarea domeniului public din România prin soluții
                digitale simple.
              </Text>
            </div>

            <div className="buttons">
              <Link to="section-four" smooth duration={500}>
                <Button
                  style={{ background: "var(--custom-red)" }}
                  rightIcon={<MdOutlineArrowDownward size={16} />}
                  radius="lg"
                  size="md"
                >
                  Despre noi
                </Button>
              </Link>

              <Link to="/login-form" smooth duration={500}>
              <Button
                variant="default"
                radius="lg"
                size="md"
                onClick={() => Router.push("/login-form")}
                
              >
                Conectare
              </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }
};

export default About;
