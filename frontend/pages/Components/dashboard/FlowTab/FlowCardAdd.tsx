import {
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";

const FlowCard = ({ onAdd, index }: { onAdd: () => void; index: number }) => {
  const addFlow = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Flow " + (index + 1), date: "" }),
    };

    fetch("/api/flows/", requestOptions)
      .then((response) => {
        return response.status;
      })
      .then((status) => {
        if (status == 200) {
          onAdd();
        }
      });
  };
  return (
    <Grid.Col span={2}>
      <Card
        onClick={addFlow}
        shadow="sm"
        p="lg"
        radius="md"
        style={{ cursor: "pointer" }}
        withBorder
      >
        <Card.Section>
          <Center>
            <IconPlus height={160} size={48} />
          </Center>
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Add new flow</Text>
        </Group>
      </Card>
    </Grid.Col>
  );
};

export default FlowCard;
