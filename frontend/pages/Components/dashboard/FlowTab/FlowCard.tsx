import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";
import Router, { useRouter } from "next/router";

export type FlowCardData = {
  image: string;
  name: string;
  id: string;
};
const FlowCard = ({ data, index }: { data: FlowCardData; index: number }) => {
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
        style={{ cursor: "pointer" }}
      >
        <Card.Section>
          <Image
            src={
              data.image
                ? data.image
                : "https://doodleipsum.com/600x400/abstract&n=" + data.id
            }
            height={160}
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{data.name}</Text>
        </Group>
      </Card>
    </Grid.Col>
  );
};

export default FlowCard;
