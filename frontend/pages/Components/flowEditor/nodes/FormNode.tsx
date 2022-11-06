import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import useStore from "../FlowStore";
import NodeHeader from "./NodeHeader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Textarea,
  Text,
  TextInput,
  Button,
  Center,
  Group,
} from "@mantine/core";
import FormInput from "./FormNodeParts/FormInput";
import { Data } from "./SendMailNode";
import { IconLink, IconPlus } from "@tabler/icons";
import uuid from "react-uuid";

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

// export type Data = { formFields: Input[] };

export function FormNode({ id, data }: { id: string; data: Data }) {
  const { updateNodeMail } = useStore();

  const defaultList = ["A", "B"];
  // React state to track order of items
  const [itemList, setItemList] = useState(defaultList);

  // Function to update list on drop
  const handleDrop = (droppedItem: any) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];

    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };

  const onChange = useCallback((evt: any) => {
    const email = evt.target.value;
    updateNodeMail(id, email);
  }, []);

  const addFormInput = () => {
    console.log("hi");
    setItemList([...itemList, uuid()]);
    console.log(itemList);
  };

  return (
    <div style={handleStyle}>
      <Handle type="target" position={Position.Left} />
      <div>
        <span className="custom-drag-handle">
          <NodeHeader
            className="custom-drag-handle"
            title={"Generează formular"}
          />
        </span>
        <TextInput
          style={{ width: 500 }}
          placeholder="Titlu"
          label="Introdu titlu"
          withAsterisk
        />

        <Textarea
          label="Descriere"
          placeholder="Introdu detalii despre formular"
          autosize
          minRows={2}
          maxRows={4}
        />
        <TextInput
          label="Nume link"
          placeholder="Introdu numele link-ului"
          withAsterisk
        />

        <Text fz="sm">Câmpuri</Text>
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemList.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="item-container"
                      >
                        <FormInput></FormInput>
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
          <Button onClick={addFormInput}>
            {" "}
            <IconPlus></IconPlus>Adaugă câmp
          </Button>
          <Button onClick={addFormInput}>
            {" "}
            <IconLink></IconLink>Obține link acces
          </Button>
        </Group>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
