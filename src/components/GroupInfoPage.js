import React, { useEffect } from "react";
import AppShellComp from "./UI/AppShell";
import { Center, Paper, Space, Text, Badge, Avatar, Card } from "@mantine/core";
import { useRouter } from "next/router";
import { selectGroups } from "@/features/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroupParticipants,
  selectGroupParticipants,
} from "@/features/groupParticipantsSlice";
import { IconCalendar } from "@tabler/icons-react";

function GroupInfoPage() {
  const { data: groupList, status } = useSelector(selectGroups);
  const { data: groupParticipants, status: participantStatus } = useSelector(
    selectGroupParticipants
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const groupName = router.query.group_name;
  const groupData = groupList.find((group) => group.name === groupName);
  useEffect(() => {
    groupName && dispatch(fetchGroupParticipants({ groupName }));
  }, [dispatch, groupName]);
  return (
    <AppShellComp>
      <Paper withBorder>
        <Center>
          <div>{groupName}</div>
        </Center>
      </Paper>
      <Paper withBorder p={10}>
        <div>Batch: {groupData?.batch}</div>
        <div>Branch: {groupData?.branch}</div>
        <div>Description: {groupData?.description || "null"}</div>
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
