import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroups } from "@/features/groupSlice";
import AppShellComp from "./UI/AppShell";
import {
  Button,
  Checkbox,
  Flex,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { selectProfile } from "@/features/profileSlice";
import { useDisclosure } from "@mantine/hooks";

export default function DashboardPage() {
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();
  const { data: Profile } = useSelector(selectProfile);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const branches = [
    {
      value: "CS",
      label: "Computer Science",
    },
    {
      value: "ECE",
      label: "Electronics and Communication",
    },
    {
      value: "MECH",
      label: "Mechanical",
    },
    {
      value: "SM",
      label: "Smart Manufacturing",
    },
    {
      value: "DS",
      label: "Design",
    },
  ];

  return (
    <AppShellComp>
      {Profile.is_userStaff && <Button onClick={open}>Create Group</Button>}
      <Modal opened={opened} onClose={close} title="Create Group" centered>
        <Flex direction={"column"} gap={10}>
          <TextInput label="Group Name" />
          <Select
            label="Batch"
            data={["2018", "2019", "2020", "2021", "2022"]}
            maxDropdownHeight={100}
            // onChange={(val) => setBatch(val)}
          />
          <Select
            label="Branch"
            data={branches}
            maxDropdownHeight={100}
            // onChange={(val) => setSelectedBranch(val)}
          />
          <TextInput label="Description" />
          <Checkbox mt={10} label="Is Group common for whole Batch ?" />
          <Button
            mt={10}
            // onClick={() => {
            //   verifySubmit();
            // }}
            variant="light"
          >
            Submit
          </Button>
        </Flex>
      </Modal>
    </AppShellComp>
  );
}
