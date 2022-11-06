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
  Menu,
  Select,
} from "@mantine/core";

export default function CreateForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      text: "",
      check1: true,
      check2: false,
      check3: false,
      dropdown: "",
    },
  });

  function CustomTextBox({ form, title, placeholder }: any) {
    return (
      <TextInput
        required
        label={title}
        placeholder={placeholder}
        value={form.values.text}
        onChange={(event) =>
          form.setFieldValue("text", event.currentTarget.value)
        }
      />
    );
  }

  function CustomCheckBoxList({ form, title, itemsList }: any) {
    return (
      <Stack>
        <Text weight={500} size={14}>
          {title}
        </Text>

        {itemsList.map(function ([check, value]: any) {
          return (
            <Checkbox
              label={value}
              checked={form.values[check]}
              onChange={(event) =>
                form.setFieldValue(check, event.currentTarget.checked)
              }
            />
          );
        })}
      </Stack>
    );
  }

  function CustomDropdown({ form, title, placeholder, itemsList }: any) {
    return (
      <Select
        label={title}
        placeholder={placeholder}
        onChange={(choice) => form.setFieldValue(form.values.dropdown, choice)}
        data={itemsList}
      />
    );
  }

  return (
    <Container fluid id="login">
      <Paper radius="md" p="xl" withBorder {...props} style={{}}>
        <Center>
          <Image src="/logo.png" style={{ width: "30%" }} />
        </Center>

        <Divider
          label="Completează formularul"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <CustomTextBox
              form={form}
              title="Titlu form"
              placeholder="placeholder"
            ></CustomTextBox>

            <CustomCheckBoxList
              form={form}
              title="titlu checkbox"
              itemsList={[
                ["check1", "item1"],
                ["check2", "item2"],
                ["check3", "item3"],
              ]}
            ></CustomCheckBoxList>

            <CustomDropdown
              form={form}
              title="titlu dropdown"
              placeholder="placeholder"
              itemsList={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
            ></CustomDropdown>

            <Center>
              <Button type="submit">Trimite</Button>
            </Center>
          </Stack>
          {/* <Stack>
            <TextInput
              required
              label="Titlu camp"
              placeholder="Continut de tip text"
              value={form.values.text}
              onChange={(event) =>
                form.setFieldValue("text", event.currentTarget.value)
              }
            />

            <Stack>
              <Text weight={500} size={14}>
                Titlul categorie checkbox *
              </Text>
              <Checkbox
                label="Checkbox1"
                checked={form.values.check1}
                onChange={(event) =>
                  form.setFieldValue("check1", event.currentTarget.checked)
                }
              />

              <Checkbox
                label="Checkbox2"
                checked={form.values.check2}
                onChange={(event) =>
                  form.setFieldValue("check2", event.currentTarget.checked)
                }
              />

              <Checkbox
                label="Checkbox3"
                checked={form.values.check3}
                onChange={(event) =>
                  form.setFieldValue("check3", event.currentTarget.checked)
                }
              />
            </Stack>
            <Select
              label="Model dropdown *"
              placeholder="Alege una"
              onChange={(choice) =>
                form.setFieldValue(form.values.dropdown, choice)
              }
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
            />

            <Center>
              <Button type="submit">Trimite</Button>
            </Center>
          </Stack> */}
        </form>
      </Paper>
    </Container>
  );
}
