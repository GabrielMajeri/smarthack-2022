import { useCallback, useMemo } from "react";
import Router, { useRouter } from "next/router";

import { useForm } from "@mantine/form";
import {
  Button,
  Container,
  Center,
  Checkbox,
  Divider,
  TextInput,
  Text,
  Stack,
  Select,
  Paper,
} from "@mantine/core";

const FORM_DATA = {
  title: "Solicitare eliberare adeverință de student",
  description:
    "Prin prezentul formular puteți solicita eliberarea unei adeverințe de student.",
  fields: [
    {
      name: "first_name",
      type: "TextField",
      label: "Nume de familie",
      placeholder: "Cutărescu",
      required: true,
    },
    {
      name: "last_name",
      type: "TextField",
      label: "Prenume",
      placeholder: "Ion",
      required: true,
    },
    {
      name: "reason",
      type: "SelectField",
      label: "Motivul pentru care se solicită emiterea adeverinței",
      defaultValue: "JOB",
      required: true,
      options: [
        { value: "JOB", label: "Să îmi servească la locul de muncă" },
        {
          value: "PUBLIC_TRANSPORT",
          label: "Pentru reducere la transportul în comun",
        },
      ],
    },
    {
      name: "consent",
      type: "CheckBoxField",
      label: "Sunt de acord cu prelucrarea datelor personale",
      required: true,
    },
  ],
};

interface FormFieldProps {
  form: any;
  name: string;
  title: string;
  placeholder?: string;
  required?: boolean;
}

interface TextBoxFormFieldProps extends FormFieldProps {}

const TextBoxFormField = ({
  form,
  name,
  title,
  placeholder,
  required,
}: TextBoxFormFieldProps) => {
  return (
    <TextInput
      required={required}
      label={title}
      name={name}
      placeholder={placeholder}
      {...form.getInputProps(name)}
    />
  );
};

type CheckBoxItem = string[];

interface CheckBoxListFormFieldProps extends FormFieldProps {
  itemsList: CheckBoxItem[];
}

const CheckBoxListFormField = ({
  form,
  name,
  title,
  itemsList,
  required,
}: CheckBoxListFormFieldProps) => {
  return (
    <Stack>
      <Text weight={500} size={14}>
        {title}
      </Text>

      {itemsList.map(([check, value]) => {
        return (
          <Checkbox
            required={required}
            name={name}
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
};

type SelectItem = { value: string; label: string };

interface SelectFormFieldProps extends FormFieldProps {
  itemsList: SelectItem[];
}

const SelectFormField = ({
  form,
  name,
  title,
  placeholder,
  itemsList,
  required,
}: SelectFormFieldProps) => {
  return (
    <Select
      required={required}
      name={name}
      label={title}
      placeholder={placeholder}
      onChange={(choice) => form.setFieldValue(form.values.dropdown, choice)}
      data={itemsList}
    />
  );
};

const Form = () => {
  const router = useRouter();
  const { organizationSlug, formSlug } = router.query;

  const initialValues = useMemo(() => {
    return FORM_DATA.fields.reduce((values, field) => {
      return {
        ...values,
        [field.name]: field.defaultValue ?? "",
      };
    }, {});
  }, [FORM_DATA]);

  const form = useForm({ initialValues });

  const handleSubmit = useCallback((values: any) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(values),
    };

    fetch("/api/forms/submit", requestOptions).then((response) => {
      if (response.ok) {
        Router.push("/forms/thanks");
      }
    });
  }, []);

  return (
    <Container fluid>
      <Paper radius="md" p="xl" withBorder>
        <main>
          <div>
            <h1>{FORM_DATA.title}</h1>
            <p>{FORM_DATA.description}</p>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Divider
              label="Completează formularul"
              labelPosition="center"
              my="lg"
            />

            <Stack>
              {FORM_DATA.fields.map((field) => {
                const props = {
                  form,
                  name: field.name,
                  title: field.label,
                  placeholder: field.placeholder,
                  required: field.required,
                  itemsList: undefined as any,
                };

                let Component;
                switch (field.type) {
                  case "TextField":
                    Component = TextBoxFormField;
                    break;
                  case "CheckBoxField":
                    Component = CheckBoxListFormField;
                    props.title = "";
                    props["itemsList"] = [[field.name, field.label]];
                    break;
                  case "SelectField":
                    Component = SelectFormField;
                    props["itemsList"] = field.options;
                    break;
                  default:
                    throw `unknown field type: ${field.type}`;
                }

                return <Component {...props} />;
              })}

              <Center>
                <Button type="submit">Trimite</Button>
              </Center>
            </Stack>
          </form>
        </main>
      </Paper>
    </Container>
  );
};

export default Form;
