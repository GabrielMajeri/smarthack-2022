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

const FlowCard = () => {
  return (
    <Grid.Col span={2}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
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
