import {
  Button,
  Badge,
  Burger,
  Drawer,
  Code,
  Title,
  Anchor,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { UnstyledButton, Group, Avatar } from "@mantine/core";
import React from "react";
import { Link } from "react-scroll";
import {
  useSession,
  signIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import Router from "next/router";

const Header = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = React.useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  const { data: session } = useSession();

  if (session) {
    return (
      <header>
        <div className="content-desktop">
          <div>
            {/* <Badge size="lg" radius={10} color="yellow">A simple Mantine template</Badge> */}
          </div>
          <div className="navbar">
            <div className="navbar-item">
              <Link to="section-four" smooth duration={500}>
                Ce facem?
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="section-five" smooth duration={500}>
                Întrebări frecvente
              </Link>
            </div>

            <div className="navbar-item">
              <Text size="lg" style={{ color: "var(--custom-red)" }}>
                Utilizator: {session.user?.name}
              </Text>
            </div>
          </div>
        </div>

        <div className="content-mobile">
          <div className="burger-button">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              title={title}
              size="sm"
            />
          </div>

          <Drawer
            transition="rotate-right"
            transitionDuration={250}
            transitionTimingFunction="ease"
            overlayOpacity={0.55}
            position="right"
            closeButtonLabel="Close drawer"
            title="Menu"
            padding="xl"
            opened={opened}
            onClose={() => setOpened(false)}
          >
            <div className="menu">
              <div className="menu-items">
                <div className="menu-item">
                  <Link
                    to="section-one"
                    smooth
                    duration={500}
                    onClick={() => setOpened(false)}
                  >
                    <Title order={2}>Carousel</Title>
                  </Link>
                </div>
                <div className="menu-item">
                  <Link
                    to="section-four"
                    smooth
                    duration={500}
                    onClick={() => setOpened(false)}
                  >
                    <Title order={2}>Cards</Title>
                  </Link>
                </div>
                <div className="menu-item">
                  <Link
                    to="section-five"
                    smooth
                    duration={500}
                    onClick={() => setOpened(false)}
                  >
                    <Title order={2}>FAQs</Title>
                  </Link>
                </div>
              </div>

              <div className="menu-items">
                <Text>Contact</Text>

                <Anchor href="mailto: contact@autoflow.ro">
                  contact@autoflow.ro
                </Anchor>
              </div>
            </div>
          </Drawer>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div className="content-desktop">
          <div>
            {/* <Badge size="lg" radius={10} color="yellow">A simple Mantine template</Badge> */}
          </div>
          <div className="navbar">
            <div className="navbar-item">
              <Link to="section-four" smooth duration={500}>
                Ce facem?
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="section-five" smooth duration={500}>
                Întrebări frecvente
              </Link>
            </div>

            <Button
              style={{ background: "var(--custom-red)" }}
              onClick={() => Router.push("/login-form")}
            >
              Conectare
            </Button>
          </div>
        </div>

        <div className="content-mobile">
          <div className="burger-button">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              title={title}
              size="sm"
            />
          </div>

          <Drawer
            transition="rotate-right"
            transitionDuration={250}
            transitionTimingFunction="ease"
            overlayOpacity={0.55}
            position="right"
            closeButtonLabel="Close drawer"
            title="Menu"
            padding="xl"
            opened={opened}
            onClose={() => setOpened(false)}
          >
            <div className="menu">
              <div className="menu-items">
                <div className="menu-item">
                  <Link
                    to="section-one"
                    smooth
                    duration={500}
                    onClick={() => setOpened(false)}
                  >
                    <Title order={2}>Carousel</Title>
                  </Link>
                </div>
                <div className="menu-item">
                  <Link
                    to="section-four"
                    smooth
                    duration={500}
                    onClick={() => setOpened(false)}
                  >
                    <Title order={2}>Cards</Title>
                  </Link>
                </div>
                <div className="menu-item">
                  <Link
                    to="section-five"
                    smooth
                    duration={500}
                    onClick={() => setOpened(false)}
                  >
                    <Title order={2}>FAQs</Title>
                  </Link>
                </div>
              </div>

              <div className="menu-items">
                <Text>Contact</Text>

                <Anchor href="mailto: contact@autoflow.ro">
                  contact@autoflow.ro
                </Anchor>
              </div>
            </div>
          </Drawer>
        </div>
      </header>
    );
  }
};

export default Header;

const redirectToLink = (link: string): void => {
  window.open(link, "_blank");
};
