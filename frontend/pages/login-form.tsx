import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Image,
  Container,
  Center,
} from "@mantine/core";
import { signIn } from "next-auth/react";

export default function LoginForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      organization: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Email invalid"),
      password: (val) =>
        val.length < 4 ? "Parola trebuie să aibă minim 4 caractere" : null,
    },
  });

  return (
    <Container fluid id="login">
      <Paper radius="md" p="xl" withBorder {...props} style={{}}>
        <Center>
          <Image src="/logo.png" style={{ width: "30%" }} />
        </Center>

        <Divider label="Conectare" labelPosition="center" my="lg" />
        <Center>
          <Button
            variant="default"
            radius="lg"
            size="md"
            onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          >
            Ai deja un cont? Conectează-te
          </Button>
        </Center>

        <Divider label="Înregistrare" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label="Nume și prenume"
              placeholder="Nume complet"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.email && ""}
            />

            <TextInput
              required
              label="Email"
              placeholder="exemplu@gmail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Email invalid"}
            />

            <PasswordInput
              required
              label="Parolă"
              placeholder="Parolă"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Parola trebuie să aibă minim 4 caractere"
              }
            />

            <TextInput
              required
              label="Organizația"
              placeholder="Organizația din care faci parte"
              value={form.values.organization}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />

            <Checkbox
              label="Accept termenii si condițiile de utilizare"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          </Stack>

          <Center>
            <Button type="submit">Înregistrează-te</Button>
          </Center>
        </form>
      </Paper>
    </Container>
  );
}
