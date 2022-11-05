import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import NodeHeader from "./NodeHeader";

const handleStyle = {
  //   height: 50,
  border: "1px solid #eee",
  padding: "5px",
  borderRadius: "5px",
  background: "white",
};

export function SendMailNode({ data }: { data: any }) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div style={handleStyle}>
      <Handle type="target" position={Position.Top} />
      <div>
        <NodeHeader title={"Send mail"} />
        <label htmlFor="text">E-mail: </label>
        <br></br>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}
