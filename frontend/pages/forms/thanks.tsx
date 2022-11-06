import { Container, Paper, Title, Text } from "@mantine/core";

const FormsThanks = () => (
  <Container size="md">
    <Paper radius="md" p="xl" withBorder>
      <Title order={1}>Formular remis</Title>
      <br />
      <Text fz="lg">Mulțumim că ați completat formularul!</Text>
    </Paper>
  </Container>
);

export default FormsThanks;
