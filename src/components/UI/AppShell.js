import React, {useEffect, useState} from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  Text,
  ScrollArea,
} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectGroups} from "@/features/groupSlice";
import Loader from "./Loader";
import {IconCalculator, IconUsers} from "@tabler/icons-react";
import {LinksGroup} from "./LinksGroup";

export default function AppShellComp({children}) {
  const {data: groupList, status} = useSelector(selectGroups);
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  const mockdata = [
    {
      label: "Groups",
      icon: IconUsers,
      links: groupList.map((grp) => ({label: grp.name, link: "/"})),
    },
  ];

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          width={{base: 275}}
          hiddenBreakpoint="sm"
          hidden={!opened}
          height={500}
          p="xs"
        >
          <Navbar.Section grow component={ScrollArea}>
            <div>{links}</div>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <div style={{display: "flex", alignItems: "center", height: "100%"}}>
            <MediaQuery largerThan="sm" styles={{display: "none"}}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
