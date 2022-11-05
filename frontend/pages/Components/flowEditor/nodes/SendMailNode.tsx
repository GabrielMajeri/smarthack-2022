import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import useStore from "../FlowStore";
import NodeHeader from "./NodeHeader";

const handleStyle = {
  //   height: 50,
  width: "200",
  border: "1px solid #eee",
  padding: "5px",
  borderRadius: "5px",
  background: "white",
};

export type Data = { destination: string };

export function SendMailNode({ id, data }: { id: string; data: Data }) {
  const { updateNodeMail } = useStore();
  const onChange = useCallback((evt: any) => {
    const email = evt.target.value;
    updateNodeMail(id, email);
  }, []);

  return (
    <div style={handleStyle}>
      <Handle type="target" position={Position.Left} />
      <div>
        <NodeHeader title={"Generează formular"} />

        <label htmlFor="text">E-mail: </label>
        <br></br>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
