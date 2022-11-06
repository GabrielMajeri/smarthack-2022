import { TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
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

export type Data = {
  destinationAddress: string;
  subject: string;
  message: string;
};

export function SendMailNode({ id, data }: { id: string; data: Data }) {
  const form = useForm({
    initialValues: {
      destinationAddress: data.destinationAddress,
      subject: data.subject,
      message: data.message,
    },
  });
  const { updateNodeData } = useStore();

  useEffect(() => {
    const newData: Data = {
      destinationAddress: form.values.destinationAddress,
      subject: form.values.subject,
      message: form.values.message,
    };
    updateNodeData(id, newData);
  }, [form.values]);

  return (
    <div style={handleStyle}>
      <Handle type="target" position={Position.Left} />
      <div>
        <NodeHeader title="Trimite e-mail" id={id} />

        <TextInput
          label="Destinatar"
          placeholder="exemplu@localhost"
          withAsterisk
          {...form.getInputProps("destinationAddress")}
        />

        <TextInput
          label="Subiect"
          placeholder="Exemplu"
          withAsterisk
          {...form.getInputProps("subject")}
        />

        <Textarea
          label="Conținutul mesajului"
          placeholder="Scrieți aici mesajul dvs...."
          withAsterisk
          {...form.getInputProps("message")}
        />
      </div>
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
