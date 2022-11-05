import {
  useMantineTheme,
  Container,
  Grid,
  Text,
  Button,
  Group,
  Avatar,
  UnstyledButton,
  Anchor,
  Code,
} from "@mantine/core";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const theme = useMantineTheme();

  return (
    <footer style={{ backgroundColor: "var(--custom-dark-blue)" }}>
      <Container>
        <Grid justify="space-around">
          <Grid.Col xs={12} sm={8} md={8} lg={8}>
            <Text size="xl" weight={500} color="white" mb="10px">
              Date de contact
            </Text>
            <Text color="white">E-mail: contact@autoflow.ro</Text>
            <Text color="white" mb="20px">
              Phone: 0740 458 976
            </Text>

            <Text size="xl" weight={500} color="white" mb="10px">
              CONTACTEAZĂ-NE!
            </Text>

            <Text color="white" mb="20px">
              Și îți vom răspunde pe cât de repede posibil.
            </Text>

            <Text color="white" mb="5px">
              Theme Giuseppetm. © Copyright 2022 AutoFlow - Toate drepturile
              rezervate
            </Text>

            {/* <Button variant="white" color="black" onClick={() => redirectToLink('https://mantine.dev/')}>Check out Mantine</Button> */}
          </Grid.Col>

          <Grid.Col xs={12} sm={4} md={4} lg={4}>
            {/* <Code color="yellow" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 15 }}>
                            Template made by
                            <Anchor href="https://github.com/Giuseppetm">
                                <UnstyledButton>
                                    <Group>
                                        <Avatar size={40} color="orange">GDC</Avatar>
                                        <div>
                                            <Text>Giuseppetm</Text>
                                            <Text size="xs" color="dimmed">giuseppe.delcampo@outlook.com</Text>
                                        </div>
                                    </Group>
                                </UnstyledButton>
                            </Anchor>
                        </Code> */}
            <Text size="xl" weight={500} color="white" mb="10px">
              Social media
            </Text>

            <SocialIcon network="twitter" style={{ marginRight: 15 }} />
            <SocialIcon network="facebook" style={{ marginRight: 15 }} />
            <SocialIcon network="linkedin" style={{ marginRight: 15 }} />
          </Grid.Col>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;

const redirectToLink = (link: string): void => {
  window.open(link, "_blank");
};
