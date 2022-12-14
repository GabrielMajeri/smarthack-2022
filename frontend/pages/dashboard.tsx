import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Image,
  Box,
  Group,
} from "@mantine/core";
import Organisation from "./Components/dashboard/Organisation";
import Teams from "./Components/dashboard/Teams";
import { MainLink } from "./Components/MainLink";
import DashboardTabs from "./Components/dashboard/DashboardTabs";
import { useSession } from "next-auth/react";
import { FiFlag, FiUser } from "react-icons/fi";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data: session } = useSession();

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
          <Organisation />
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
            <Teams />
          </Box>
          <MainLink label="Adaugă echipă"></MainLink>
        </Navbar>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      header={
        <Header height={{ base: 10, md: 70 }} p="md">
          <div style={{ display: "flex" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Image height={48} width={150} src="/logo.png"></Image>

            {session ? (
              <div style={{ marginLeft: "auto" }}>
                <Group>
                  <FiUser
                    size={30}
                    style={{ color: "var(--custom-dark-blue)" }}
                  />
                  <Text size="lg" style={{ color: "var(--custom-dark-blue)" }}>
                    {session?.user?.name}
                  </Text>
                </Group>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Header>
      }
    >
      {" "}
      <DashboardTabs />
    </AppShell>
  );
}
