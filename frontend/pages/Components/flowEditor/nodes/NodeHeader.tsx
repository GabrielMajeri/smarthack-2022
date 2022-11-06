import { Center, CloseButton, Group, Text } from "@mantine/core";
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
        <Text className="custom-drag-handle" fz="xl" weight={600}>
          {title}
        </Text>
      </Center>
      <hr></hr>
    </div>
  );
};

export default NodeHeader;
