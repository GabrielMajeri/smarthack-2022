import { Center, CloseButton, Group } from "@mantine/core";
import useStore from "../FlowStore";

type NodeHeaderProps = {
  title: string;
  id: string;
};

const NodeHeader = ({ title, id }: NodeHeaderProps) => {
  const { removeNode } = useStore();

  return (
    <div className="custom-drag-handle">
      <Group position="right">
        <CloseButton aria-label="Close modal" onClick={() => removeNode(id)} />
      </Group>
      <Center>
        <span
          className="custom-drag-handle"
          style={{ fontWeight: "bold", fontSize: "1.5em" }}
        >
          {title}
        </span>
      </Center>
      <hr></hr>
    </div>
  );
};

export default NodeHeader;
