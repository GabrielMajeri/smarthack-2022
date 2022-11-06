import { Group, CloseButton } from "@mantine/core";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import useStore, { useNodeData } from "../FlowStore";
import NodeHeader from "./NodeHeader";

const handleStyle = {
  //   height: 50,
  width: "200",
  border: "1px solid #eee",
  padding: "5px",
  borderRadius: "5px",
  background: "white",
};

export type Data = { destinationAddress: string };

export function SendMailNode({ id, data }: { id: string; data: Data }) {
  const { updateNodeData } = useStore();

  const onChange = useCallback((evt: any) => {
    const email = evt.target.value;
    updateNodeData(id, { destinationAddress: email });
  }, []);

  const nodeData = useNodeData<Data>(id);
  console.log(nodeData);

  return (
    <div style={handleStyle}>
      <Handle type="target" position={Position.Left} />
      <div>
        <NodeHeader title="Trimite e-mail" id={id} />

        <label htmlFor="destinationAddress">E-mail: </label>
        <br></br>
        <input
          id="destinationAddress"
          name="destinationAddress"
          value={data.destinationAddress || nodeData?.destinationAddress}
          onChange={onChange}
        />
      </div>
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
