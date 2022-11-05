import { Tabs } from "@mantine/core";
import { IconVectorBezier, IconUsers } from "@tabler/icons";
import FlowTab from "./FlowTab/FlowTab";

const DashboardTabs = () => {
  return (
    <Tabs variant="outline" defaultValue="flows">
      <Tabs.List>
        <Tabs.Tab value="flows" icon={<IconVectorBezier size={30} />}>
          Flow-uri
        </Tabs.Tab>
        <Tabs.Tab value="members" icon={<IconUsers size={30} />}>
          Membri
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="flows" pt="xs">
        <FlowTab />
      </Tabs.Panel>

      <Tabs.Panel value="members" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
};

export default DashboardTabs;
