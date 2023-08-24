import React, { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  Text,
  ScrollArea,
  Group,
  Menu,
  UnstyledButton,
  Avatar,
  createStyles,
  rem,
  Button,
  ActionIcon,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroups } from "@/features/groupSlice";
import PageLoader from "./PageLoader";
import {
  IconChevronDown,
  IconCompass,
  IconInfoCircle,
  IconLogout,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { LinksGroup } from "./LinksGroup";
import { selectProfile } from "@/features/profileSlice";
import Link from "next/link";
import { logoutRequest } from "@/pages/api/api";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: rem(120),
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

export default function AppShellComp({ groupTitle, children }) {
  const { data: groupList, status } = useSelector(selectGroups);
  const { data: profileData } = useSelector(selectProfile);
  // const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const groupName = router.query.group_name || "";
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    dispatch(fetchGroups());
    const savedSelectedSection = localStorage.getItem("selectedSection");
    if (savedSelectedSection) {
      setSelectedSection(savedSelectedSection);
    }
  }, [dispatch]);

  function Logout() {
    logoutRequest();
    router.reload();
  }

  if (status === "loading") {
    return <PageLoader />;
  }

  const mockdata = [
    {
      label: "Groups",
      icon: IconUsers,
      links: groupList.map((grp) => ({
        label: grp.name,
        link: `/group/${grp.name}`,
      })),
    },
  ];

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} activeGroup={groupName} />
  ));

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          width={{ base: 275 }}
          hiddenBreakpoint="sm"
          hidden={!opened}
          withBorder
          // height={500}
          p="xs"
        >
          <Navbar.Section>
            <div>{links}</div>
          </Navbar.Section>
          <Link
            href={"/lost-found"}
            style={{ color: "black", textDecoration: "none" }}
          >
            <Navbar.Section
              style={{
                padding: "9px",
                margin: "2px",
                borderRadius: "3px",
                transition: "background-color 0.2s",
                backgroundColor: selectedSection === "LandF" ? "#81aeff94" : "",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedSection("LandF");
                localStorage.setItem("selectedSection", "LandF");
              }}
            >
              <Group ml={8}>
                <ActionIcon variant="light" color="blue">
                  <IconCompass stroke={1.5} />
                </ActionIcon>
                <Text size={"sm"}>Lost / Found</Text>
              </Group>
            </Navbar.Section>
          </Link>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Group>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                />
              </MediaQuery>

              <Link href={"/dashboard"} style={{ textDecoration: "none" }}>
                <Group>
                  <img
                    style={{ height: "27px" }}
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                  <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                    <Text fw={600} fz={"xl"} color="black">
                      Maven
                    </Text>
                  </MediaQuery>
                </Group>
              </Link>
            </Group>
            <Group>
              {groupTitle ? (
                <>
                  <Text>{groupTitle}</Text>
                  <Link href={`/group/${router.query.group_name}/info`}>
                    <ActionIcon>
                      <IconInfoCircle />
                    </ActionIcon>
                  </Link>
                </>
              ) : (
                ""
              )}
            </Group>
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group spacing={7}>
                    <Avatar color="indigo" radius="xl">
                      <IconUser />
                    </Avatar>
                    <Text
                      style={{
                        marginLeft: "7px",
                        overflow: "hidden",
                        maxWidth: "12vw",
                        textOverflow: "ellipsis",
                      }}
                      weight={500}
                      size="sm"
                      sx={{ lineHeight: 1 }}
                      mr={3}
                    >
                      {profileData.email}
                    </Text>
                    <IconChevronDown size={rem(12)} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                  Account settings
                </Menu.Item>

                <Menu.Item
                  color="red"
                  icon={<IconLogout size="0.9rem" stroke={1.5} />}
                  onClick={() => Logout()}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </Header>
      }
    >
      <div>{children}</div>
    </AppShell>
  );
}
