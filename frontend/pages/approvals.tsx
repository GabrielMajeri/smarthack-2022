import {
  Text,
  Paper,
  PaperProps,
  Button,
  Image,
  Container,
  Center,
} from "@mantine/core";
import Router from "next/router";

export default function LoginForm(props: PaperProps) {
  return (
    <Container fluid id="login">
      <Paper radius="md" p="xl" withBorder {...props} style={{}}>
        <Center>
          <Image src="/logo.png" style={{ width: "30%" }} />
        </Center>
        <div style={{ marginBottom: 25, marginTop: 25 }}>
          <Text size="xl" color="black">
            Aveți o cerere care necesită aprobarea dumneavoastră
          </Text>
          <Text size="md" color="black">
            Detalii cerere
          </Text>
        </div>

        <Button
          variant="default"
          radius="lg"
          size="md"
          style={{ backgroundColor: "green" }}
          onClick={() => Router.push("/approvals")}
        >
          Aprobă
        </Button>
        <Button
          variant="default"
          radius="lg"
          size="md"
          onClick={() => Router.push("/approvals")}
        >
          Șterge
        </Button>
      </Paper>
    </Container>
  );
}
