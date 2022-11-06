import {
  Card,
  Checkbox,
  CloseButton,
  Group,
  Select,
  TextInput,
} from "@mantine/core";

const FormField = ({ form, onRemove }: { form: any; onRemove: () => void }) => {
  return (
    <Card
      style={{
        padding: "10px",
        margin: "10px 5px 10px 5px",
        border: "1px solid #CCCCCC",
        borderRadius: "5px",
      }}
    >
      <Group position="right">
        <CloseButton aria-label="Close modal" onClick={onRemove} />
      </Group>
      <Select
        placeholder="Tip câmp"
        data={[
          { value: "text", label: "Text" },
          { value: "checkbox", label: "Bifă" },
          { value: "dropdown", label: "Dropdown" },
        ]}
        {...form.getInputProps("type")}
      />
      <TextInput
        placeholder="Ce cere utilizatorului?"
        label="Cerință câmp"
        withAsterisk
      />
      <TextInput label="Placeholder" withAsterisk />
      <Checkbox label="Câmp obligatoriu" />
    </Card>
  );
};

export default FormField;
