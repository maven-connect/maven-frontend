import React, { useEffect, useState } from "react";
import AppShellComp from "./UI/AppShell";
import {
  Center,
  Paper,
  Space,
  Text,
  Badge,
  Avatar,
  Card,
  Group,
  Button,
  Modal,
  TextInput,
  ActionIcon,
  MultiSelect,
  ScrollArea,
} from "@mantine/core";
import { useRouter } from "next/router";
import { selectGroups } from "@/features/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroupParticipants,
  selectGroupParticipants,
} from "@/features/groupParticipantsSlice";
import { IconCalendar } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { selectProfile } from "@/features/profileSlice";
import { checkDayAttendance, markDayAttendance } from "@/pages/api/api";

function GroupInfoPage() {
  const { data: groupList, status } = useSelector(selectGroups);
  const { data: groupParticipants, status: participantStatus } = useSelector(
    selectGroupParticipants
  );

  const { data: profile } = useSelector(selectProfile);
  const dispatch = useDispatch();
  const router = useRouter();
  const groupName = router.query.group_name;
  const groupData = groupList.find((group) => group.name === groupName);
  const [AttendanceDate, setAttendanceDate] = useState(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const [checkAttendance, { open: openCheck, close: closeCheck }] =
    useDisclosure(false);

  const [checkDate, setcheckDate] = useState(new Date());
  const [absent, setabsent] = useState(null);

  const [searchValue, setSearchValue] = useState([]);

  useEffect(() => {
    groupName && dispatch(fetchGroupParticipants({ groupName }));
  }, [dispatch, groupName]);

  const submitAttendance = async () => {
    const date = new Date(AttendanceDate);

    try {
      const response = await markDayAttendance(
        groupData.name,
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        searchValue
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAbsent = async () => {
    const date = new Date(checkDate);

    try {
      const response = await checkDayAttendance(
        groupData.id,
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      const { data } = response;
      setabsent(data.absent);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppShellComp>
      {participantStatus === "succeeded" && (
        <Modal
          centered
          opened={opened}
          onClose={close}
          title={"Group Attendance"}
          size={"xl"}
          closeOnClickOutside={false}
        >
          <Group mt={10} align="center" position="apart">
            <TextInput
              label="Date"
              readOnly
              value={
                new Date(AttendanceDate).getDate().toString() +
                " / " +
                (new Date(AttendanceDate).getMonth() + 1).toString() +
                " / " +
                new Date(AttendanceDate).getFullYear().toString()
              }
            />
            <DatePicker
              size="sm"
              value={AttendanceDate}
              onChange={setAttendanceDate}
            />
          </Group>

          <MultiSelect
            mb={150}
            maxDropdownHeight={135}
            searchable
            nothingFound="Nothing found"
            dropdownPosition="bottom"
            label="Absent Students"
            data={groupParticipants.map((el) => el.email)}
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Select absent students"
          />

          <Button w={150} onClick={submitAttendance}>
            Submit
          </Button>
        </Modal>
      )}
      <Modal
        centered
        opened={checkAttendance}
        onClose={() => {
          closeCheck();
          setabsent(null);
          setcheckDate(new Date());
        }}
        title="Check Attendance"
        size={"xl"}
      >
        <Group mt={10} align="center" position="apart">
          <TextInput
            label="Date"
            readOnly
            value={
              new Date(checkDate).getDate().toString() +
              " / " +
              (new Date(checkDate).getMonth() + 1).toString() +
              " / " +
              new Date(checkDate).getFullYear().toString()
            }
          />
          <DatePicker size="sm" value={checkDate} onChange={setcheckDate} />
        </Group>
        <Button mt={15} onClick={getAbsent}>
          Check
        </Button>
        <ScrollArea mt={10} mah={300}>
          {absent && <Text color="red">List of User&apos;s Absent:</Text>}
          {absent &&
            absent.map((el, index) => (
              <Paper key={index} withBorder my={5} p={5}>
                <Text>
                  {index}) {el}
                </Text>
              </Paper>
            ))}
        </ScrollArea>
      </Modal>
      <Paper withBorder>
        <Center>
          <Text size={"xl"}>{groupName}</Text>
        </Center>
      </Paper>
      <Paper withBorder p={10}>
        <Group position="apart" mt={10}>
          <Text>Batch: {groupData?.batch}</Text>
          {profile.email === groupData?.admin && (
            <Group>
              <Button onClick={open} color="teal">
                Mark Attendance
              </Button>
              <Button onClick={openCheck}>Check Attendance</Button>
            </Group>
          )}
        </Group>
        <Text>Branch: {groupData?.branch}</Text>
        <Text>Description: {groupData?.description || "null"}</Text>
        <Space h={20} />
        <Group>
          <Text size={"xl"}>Admin :</Text>
          <Text color="blue">{groupData?.admin}</Text>
        </Group>

        <Space h={20} />
        <div>
          <Text fz={"xl"}>Participants :</Text>
          {participantStatus === "succeeded" ? (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {groupParticipants.map((participant, index) => (
                <Card
                  key={index}
                  shadow="xs"
                  padding="xs"
                  radius="sm"
                  style={{ marginBottom: "8px" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar color="cyan" size={24} radius="xl">
                      {participant.email[0].toUpperCase()}
                    </Avatar>
                    <Text
                      size="sm"
                      weight={500}
                      style={{
                        marginLeft: "8px",
                        flexGrow: 1,
                        overflow: "hidden",
                      }}
                    >
                      {participant.email}
                    </Text>
                    <Badge color="gray" style={{ marginRight: "4px" }}>
                      <IconCalendar size={12} style={{ marginRight: "4px" }} />
                      Joined
                    </Badge>
                    <Text size="xs" style={{ color: "#777" }}>
                      {new Date(participant.date_joined).toLocaleDateString()}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </Paper>
    </AppShellComp>
  );
}

export default GroupInfoPage;
