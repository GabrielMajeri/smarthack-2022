import {
  Box,
  Text,
  UnstyledButton,
  Group,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import { IconBuildingBank, IconStar } from "@tabler/icons";

const Organisation = () => {
  const theme = useMantineTheme();
  return (
    <Box
      sx={{
        paddingBottom: theme.spacing.sm,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar color="blue" radius="xl">
            <IconBuildingBank size={24} />
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Poliția Română
            </Text>
            <Text color="dimmed" size="xs">
              Organizație
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default Organisation;
