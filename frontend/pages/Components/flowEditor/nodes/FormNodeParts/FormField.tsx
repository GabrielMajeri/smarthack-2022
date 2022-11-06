import {
  Card,
  Checkbox,
  CloseButton,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect } from "react";

const FormField = ({
  form,
  index,
  onChange,
  onRemove,
}: {
  form: any;
  index: number;
  onChange: () => void;
  onRemove: () => void;
}) => {
  useEffect(onChange, form.values.fields[index]);

  return (
    <Card
      style={{
        padding: "10px",
        margin: "10px 5px 10px 5px",
        border: "1px solid #CCCCCC",
        borderRadius: "5px",
      }}
    >
      <Text fz="sm" fw={700}>
        Câmp #{index + 1}
      </Text>
      <Group position="right">
        <CloseButton aria-label="Close modal" onClick={onRemove} />
      </Group>
      <Select
        withAsterisk
        label="Tip câmp"
        data={[
          { value: "text", label: "Text" },
          { value: "checkbox", label: "Bifă" },
          { value: "select", label: "Dropdown" },
        ]}
        {...form.getInputProps(`fields.${index}.type`)}
      />
      <TextInput
        label="Denumire internă câmp"
        placeholder="input_field_1"
        withAsterisk
        {...form.getInputProps(`fields.${index}.name`)}
      />
      <TextInput
        placeholder="Ce cere utilizatorului?"
        label="Cerință câmp"
        withAsterisk
        {...form.getInputProps(`fields.${index}.label`)}
      />
      <TextInput
        label="Placeholder"
        withAsterisk
        {...form.getInputProps(`fields.${index}.placeholder`)}
      />
      <div style={{ padding: "1em 0.5em 0" }}>
        <Checkbox
          label="Acest câmp va fi obligatoriu"
          {...form.getInputProps(`fields.${index}.required`)}
        />
      </div>
    </Card>
  );
};

export default FormField;
