import { useCallback, useMemo } from "react";
import Router from "next/router";
import Head from "next/head";

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
  Title,
} from "@mantine/core";

import { FLOWS_MICROSERVICE_URL } from "../../../utils/api";

// const FORM_DATA = {
//   title: "Solicitare eliberare adeverință de student",
//   description:
//     "Prin prezentul formular puteți solicita eliberarea unei adeverințe de student.",
//   fields: [
//     {
//       name: "first_name",
//       type: "text",
//       label: "Nume de familie",
//       placeholder: "Cutărescu",
//       required: false,
//     },
//     {
//       name: "last_name",
//       type: "text",
//       label: "Prenume",
//       placeholder: "Ion",
//       required: false,
//     },
//     {
//       name: "reason",
//       type: "select",
//       label: "Motivul pentru care se solicită emiterea adeverinței",
//       defaultValue: "JOB",
//       required: false,
//       options: [
//         { value: "JOB", label: "Să îmi servească la locul de muncă" },
//         {
//           value: "PUBLIC_TRANSPORT",
//           label: "Pentru reducere la transportul în comun",
//         },
//       ],
//     },
//     {
//       name: "consent",
//       type: "checkbox",
//       label: "Sunt de acord cu prelucrarea datelor personale",
//       required: false,
//     },
//   ],
// };

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
      onChange={(choice) => form.setFieldValue(form.values[name], choice)}
      data={itemsList}
    />
  );
};

type Flow = {
  id: string;
};

type Field = {
  id: number;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: string;
};

type FormData = {
  id: string;
  fields: Field[];
  title: string;
  description?: string;
};

type FormProps = {
  flow: Flow;
  formData: FormData;
};

const Form = ({ flow, formData }: FormProps) => {
  if (!flow) {
    return <p>Flow-ul părinte al acestui formular nu a fost găsit.</p>;
  }
  const flowId = flow.id;
  const formNodeId = formData.id;

  const initialValues = useMemo(() => {
    const hiddenFieldsValues = {
      flowId,
      formNodeId,
    };

    const fieldsInitialValues = formData.fields.reduce((values, field) => {
      return {
        ...values,
        [field.name]: field.defaultValue ?? "",
      };
    }, {});

    return { ...hiddenFieldsValues, ...fieldsInitialValues };
  }, [formData]);

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
    <Container size="md">
      <Head>
        <title>{formData.title} - Formular - AutoFlow</title>
      </Head>
      <Paper radius="md" p="xl" withBorder>
        <main>
          <div>
            <Title order={1}>{formData.title}</Title>
            <p>{formData.description}</p>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <input type="hidden" {...form.getInputProps("flowId")} />
            <input type="hidden" {...form.getInputProps("formId")} />

            <Divider
              label="Completează formularul de mai jos"
              labelPosition="center"
              my="lg"
            />

            <Stack>
              {formData.fields.map((field) => {
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
                  case "text":
                    Component = TextBoxFormField;
                    break;
                  case "checkbox":
                    Component = CheckBoxListFormField;
                    props.title = "";
                    props["itemsList"] = [[field.name, field.label]];
                    break;
                  case "select":
                    Component = SelectFormField;
                    // TODO
                    props["itemsList"] = [];
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

export async function getServerSideProps(context: any) {
  const { organizationSlug, formSlug } = context.query;

  const response = await fetch(`${FLOWS_MICROSERVICE_URL}/flows`);
  const flows = await response.json();

  let formData;

  const flow =
    flows.find((flow: any) => {
      const nodes = flow.date.nodes;
      const formNode = nodes.find(
        (node: any) =>
          node.data.nodeType === "formNode" && node.data.slug == formSlug
      );

      if (formNode === undefined) {
        return false;
      }

      formData = {
        id: formNode.id,
        title: formNode.data.title,
        description: formNode.data.description || null,
        fields: formNode.data.fields,
      };

      return true;
    }) ?? null;

  // Pass data to the page via props
  return { props: { flow, formData } };
}
