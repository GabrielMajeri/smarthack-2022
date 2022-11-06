import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";
import Router, { useRouter } from "next/router";

export type FlowCardData = {
  image: string;
  name: string;
  id: string;
};
const FlowCard = ({ data }: { data: FlowCardData }) => {
  const router = useRouter();
  return (
    <Grid.Col span={2}>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        onClick={() => {
          router.push("/flows/" + data.id);
        }}
      >
        <Card.Section>
          <Image
            src={
              data.image
                ? data.image
                : "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            }
            height={160}
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{data.name ? data.name : "Untitled Flow"}</Text>
        </Group>
      </Card>
    </Grid.Col>
  );
};

export default FlowCard;
