import { useEffect, useMemo, useState } from "react";
import { Handle, Position } from "reactflow";
import useStore from "../FlowStore";
import NodeHeader from "./NodeHeader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Textarea, Text, TextInput, Button, Card, Group } from "@mantine/core";
import FormField from "./FormNodeParts/FormField";
import { IconLink, IconPlus } from "@tabler/icons";
import { useForm } from "@mantine/form";

const handleStyle = {
  // height: 50,
  border: "1px solid #eee",
  padding: "5px",
  borderRadius: "5px",
  background: "white",
};

// type TextboxInput = { label: string };
// type CheckboxInput = { label: string; value: string };
// type DropdownInput = { label: string; value: string };
// type Input = TextboxInput | CheckboxInput | DropdownInput;

type Field = {
  id: number;
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: string;
};

type Data = {
  slug: string;
  title: string;
  description?: string;
  fields: Field[];
};

export function FormNode({ id, data }: { id: string; data: Data }) {
  const form = useForm({
    initialValues: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      fields: data.fields || [],
    },
  });

  const { updateNodeData } = useStore();

  const saveChanges = () => {
    const data = {
      slug: form.values.slug,
      title: form.values.title,
      description: form.values.description,
      fields: form.values.fields,
    };
    updateNodeData(id, data);
  };

  useEffect(() => saveChanges(), [form.values]);

  const [formLinkVisible, setFormLinkVisible] = useState(false);

  const formLink = useMemo(() => {
    if (!formLinkVisible) {
      return "";
    }

    return `http://localhost:3000/forms/police/${form.values.slug}`;
  }, [formLinkVisible]);

  // Function to update list on drop
  const handleDrop = ({ destination, source }: any) => {
    // Ignore drop outside droppable container
    if (!destination) {
      return;
    }

    form.reorderListItem("fields", {
      from: source.index,
      to: destination.index,
    });
  };

  const addFormField = () => {
    const id = form.values.fields.length;
    form.insertListItem("fields", {
      id,
      type: "text",
      name: "",
      label: "",
      required: false,
    });
  };

  const removeFormField = (index: number) => {
    form.removeListItem("fields", index);
  };

  return (
    <div style={handleStyle}>
      <NodeHeader title="Generează formular" id={id} />

      <div>
        <TextInput
          label="Slug / componentă link"
          placeholder="Introdu identificatorul acestui formular, care va apărea în link"
          withAsterisk
          {...form.getInputProps("slug")}
        />

        <TextInput
          style={{ width: 500 }}
          placeholder="Titlu"
          label="Introdu titlu"
          withAsterisk
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Descriere"
          placeholder="Introdu detalii despre formular"
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps("description")}
        />

        <Text fz="sm" fw={700} style={{ marginTop: "1em" }}>
          Câmpuri
        </Text>

        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {form.values.fields.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="item-container"
                      >
                        <FormField
                          form={form}
                          index={index}
                          onChange={saveChanges}
                          onRemove={() => removeFormField(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Group position="center">
          <Button onClick={addFormField}>
            <IconPlus></IconPlus> &nbsp; Adaugă câmp
          </Button>
          <Button onClick={() => setFormLinkVisible(true)}>
            <IconLink></IconLink> &nbsp; Obține link acces
          </Button>
        </Group>
        {formLinkVisible && (
          <div style={{ padding: "0.5em 0.25em" }}>
            <TextInput value={formLink} readOnly />
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
