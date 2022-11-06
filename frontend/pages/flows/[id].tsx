import { useEffect, useState } from "react";
import {
  AppShell,
  Button,
  Divider,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import FlowEditor from "../Components/flowEditor/FlowEditor";
import FlowNodesDnd from "../Components/flowEditor/FlowNodesDnd";
import { useRouter } from "next/router";
import useStore from "../Components/flowEditor/FlowStore";
import { Edge } from "reactflow";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [flowData, setFlowData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const { nodes, edges, addNode, addEdge } = useStore();
  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`/api/flows/` + id)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        setFlowData(json);
        console.log(json.date);
        if (json.date.nodes && json.date.edges) {
          json.date.nodes.map((node: Node) => {
            addNode(node);
          });
          json.date.edges.map((edge: Edge) => {
            addEdge(edge);
          });
        }
      });
  }, [id]);

  if (flowData == null) {
    return <>Loading...</>;
  }

  const saveFlow = () => {
    console.log("saving...");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: {
          nodes: nodes,
          edges: edges,
        },
      }),
    };

    fetch("/api/flows/" + id, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
  };
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
          <Text style={{ paddingBottom: "10px" }}>{flowData.name}</Text>
          <Divider></Divider>
          <FlowNodesDnd />
          <Button onClick={saveFlow}>Save</Button>
        </Navbar>
      }
    >
      <FlowEditor></FlowEditor>
    </AppShell>
  );
}
