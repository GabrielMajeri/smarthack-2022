import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import useStore from "../FlowStore";
import NodeHeader from "./NodeHeader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const handleStyle = {
  //   height: 50,
  border: "1px solid #eee",
  padding: "5px",
  borderRadius: "5px",
  background: "white",
};

type TextboxInput = { label: string };
type CheckboxInput = { label: string; value: string };
type DropdownInput = { label: string; value: string };
type Input = TextboxInput | CheckboxInput | DropdownInput;

export type Data = { formFields: Input[] };

const defaultList = ["A", "B", "C", "D", "E"];

export function FormNode({ id, data }: { id: string; data: Data }) {
  const { updateNodeMail } = useStore();

  const defaultList = ["A", "B", "C", "D", "E"];
  // React state to track order of items
  const [itemList, setItemList] = useState(defaultList);

  // Function to update list on drop
  const handleDrop = (droppedItem: any) => {
    console.log(droppedItem);
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

  return (
    <div style={handleStyle}>
      <Handle type="target" position={Position.Left} />
      <div>
        <NodeHeader title={"Generează formular"} />
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
                        {item}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
