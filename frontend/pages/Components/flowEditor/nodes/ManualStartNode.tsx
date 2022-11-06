import { Group, CloseButton, Button } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import useStore, { useNodeData } from "../FlowStore";
import NodeHeader from "./NodeHeader";

const handleStyle = {
  width: "200",
  border: "1px solid #eee",
  padding: "5px",
  borderRadius: "5px",
  background: "white",
};

export type Data = { destinationAddress: string };

export function ManualStartNode({ id, data }: { id: string; data: Data }) {
  const { updateNodeData, saveFlow, removeNode } = useStore();

  const onChange = useCallback((evt: any) => {
    console.log("saving...");
    saveFlow();
    console.log("start!");
  }, []);

  const nodeData = useNodeData<Data>(id);
  console.log(nodeData);

  return (
    <div style={handleStyle}>
      <span
        className="custom-drag-handle"
        style={{ fontWeight: "bold", fontSize: "1.5em" }}
      >
        <Group position="right">
          <CloseButton
            aria-label="Close modal"
            onClick={() => removeNode(id)}
          />
        </Group>
      </span>

      <div>
        <Button onClick={onChange}>
          <IconPlayerPlay></IconPlayerPlay>
        </Button>
      </div>

      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
