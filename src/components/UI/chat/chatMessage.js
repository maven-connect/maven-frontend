import { approveMessages } from "@/features/messageSlice";
import { selectProfile } from "@/features/profileSlice";
import { Avatar, Badge, Button, Flex, Group, Paper, Text } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatMessage({ messageData, segmented }) {
  const { data: profileData } = useSelector(selectProfile);
  const dispatch = useDispatch();

  const isSentByCurrentUser = messageData.user === profileData.email;
  const isUserStaff = profileData.is_userStaff;

  const handleApproveClick = () => {
    dispatch(
      approveMessages({ groupName: messageData.groupName, id: messageData.id })
    );
  };
  return (
    <>
      <Group style={{ position: "relative", right: "0px", top: "20px" }}>
        {isSentByCurrentUser ? (
          <>
            <Avatar
              style={{ position: "absolute", right: "0px" }}
              color="cyan"
              size={25}
              radius="xl"
            >
              MK
            </Avatar>
          </>
        ) : (
          <>
            <Avatar
              style={{ position: "absolute" }}
              color="cyan"
              size={25}
              radius="xl"
            >
              MK
            </Avatar>
          </>
        )}
      </Group>
      <Paper
        shadow="xs"
        h={"min-content"}
        withBorder
        mx={30}
        w={"max-content"}
        radius={"md"}
        px={"xs"}
        py={5}
        style={{
          alignSelf:
            messageData.user == profileData.email ? "flex-end" : "flex-start",
        }}
        miw={150}
      >
        {messageData.type === "ISP" && (
          <Badge
            color={messageData.category === "ISS" ? "red" : "blue"}
            size="lg"
            mb={5}
            variant="filled"
          >
            {messageData.category === "ISS" ? "ISSUE" : "PERMISSION"}
          </Badge>
        )}
        <Text
          c={"dimmed"}
          size={"sm"}
          style={{ wordWrap: "break-word" }}
          w={"max-content"}
        >
          {messageData.user}
        </Text>
        <Flex direction={"column"}>
          <Text
            maw={300}
            style={{ wordWrap: "break-word" }}
            fw={messageData.type === "ISP" ? 550 : 500}
            size={18}
            w={"max-content"}
          >
            {messageData.content}
          </Text>
          <Text
            c={"dimmed"}
            size={"xs"}
            ta={"right"}
            mt={"-8px"}
            style={{ wordWrap: "break-word" }}
          >
            {new Date(messageData.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Group position="apart">
            {messageData.type === "ISP" && (
              <Text size="sm" color={messageData.accepted ? "green" : "red"}>
                {messageData.accepted ? "Accepted" : "Not Accepted"}
              </Text>
            )}
            {isUserStaff && messageData.type === "ISP" && !messageData.accepted && (
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleApproveClick()}
                style={{ alignSelf: "flex-end", marginTop: "8px" }}
              >
                Approve
              </Button>
            )}
          </Group>
        </Flex>
      </Paper>
    </>
  );
}
