import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewGroup,
  fetchGroups,
  selectGroups,
} from "@/features/groupSlice";
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
import { Toaster, toast } from "react-hot-toast";

export default function DashboardPage() {
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();
  const batches = ["2018", "2019", "2020", "2021", "2022"];
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

  const { data: Profile } = useSelector(selectProfile);
  const [opened, { open, close }] = useDisclosure(false);
  const [batch, setBatch] = useState(null);
  const [branch, setbranch] = useState(null);
  const [description, setdescription] = useState("");
  const [isGroupCommon, setisGroupCommon] = useState(false);
  const [groupName, setgroupName] = useState("");

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  async function createGroupSubmit() {
    dispatch(
      createNewGroup({
        group_name: groupName,
        group_branch: branch,
        group_batch: batch,
        description,
      })
    ).then((res) => {
      if (res.payload) {
        setBatch(null);
        setbranch(null);
        setdescription("");
        setisGroupCommon(false);
        setgroupName("");
        close();
      } else {
        toast.error("Failed to create Group");
      }
    });
  }

  return (
    <AppShellComp>
      <Toaster position="bottom-right" />
      {Profile.is_userStaff && <Button onClick={open}>Create Group</Button>}
      <Modal opened={opened} onClose={close} title="Create Group" centered>
        <Flex direction={"column"} gap={10}>
          <TextInput
            label="Group Name"
            value={groupName}
            onChange={(el) => setgroupName(el.currentTarget.value)}
          />
          <Select
            label="Batch"
            data={batches}
            maxDropdownHeight={100}
            value={batch}
            onChange={(val) => setBatch(val)}
            placeholder="Pick one"
          />
          <Select
            label="Branch"
            data={branches}
            maxDropdownHeight={100}
            value={branch}
            onChange={(val) => setbranch(val)}
            placeholder="Pick one"
          />
          <TextInput
            label="Description"
            value={description}
            onChange={(el) => setdescription(el.currentTarget.value)}
          />
          <Checkbox
            mt={10}
            label="Is Group common for whole Batch ?"
            checked={isGroupCommon}
            onChange={(el) => setisGroupCommon(el.currentTarget.checked)}
          />
          <Button
            mt={10}
            onClick={() => {
              createGroupSubmit();
            }}
            variant="light"
          >
            Submit
          </Button>
        </Flex>
      </Modal>
    </AppShellComp>
  );
}
