import { Center, FileInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Handle, Position } from "reactflow";
import NodeHeader from "./NodeHeader";

const handleStyle = {
  //   height: 50,
  width: "200",
  border: "1px solid #eee",
  padding: "5px",
  borderRadius: "5px",
  background: "white",
};

export type Data = { approverAddress: string };

export function RenderTemplateNode({ id, data }: { id: string; data: Data }) {
  const form = useForm();

  const handleFileUpload = () => {
    const file = form.values.template as any;

    const data = new FormData();
    data.append("file", file, file.name);

    const requestOptions = {
      method: "POST",
      body: data,
    };
    fetch(`/api/documents`, requestOptions).then((res) =>
      console.log(res.status)
    );
  };

  return (
    <div style={handleStyle}>
      <Handle type="target" position={Position.Left} />
      <div>
        <NodeHeader title="Generare document din șablon" id={id} />

        <FileInput
          label="Document template"
          placeholder="Selectați fișierul șablon"
          withAsterisk
          {...form.getInputProps("template")}
        />

        <Center style={{ paddingTop: "0.5em" }}>
          <Button onClick={handleFileUpload}>Încarcă</Button>
        </Center>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
