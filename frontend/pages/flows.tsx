import { useState } from "react";
import {
  AppShell,
  Divider,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import FlowEditor from "./Components/flowEditor/FlowEditor";
import FlowNodesDnd from "./Components/flowEditor/FlowNodesDnd";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text style={{ paddingBottom: "10px" }}>Flow Editor</Text>
          <Divider></Divider>
          <FlowNodesDnd />
        </Navbar>
      }
    >
      <FlowEditor></FlowEditor>
    </AppShell>
  );
}
