import { selectProfile } from "@/features/profileSlice";
import { Avatar, Flex, Group, Paper, Text } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

export default function ChatMessage({ messageData }) {
  const { data: profileData } = useSelector(selectProfile);

  const isSentByCurrentUser = messageData.user === profileData.email;

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
        shadow="lg"
        h={"min-content"}
        withBorder
        mx={30}
        w={"max-content"}
        radius={"md"}
        p={"sm"}
        pt={2}
        style={{
          alignSelf:
            messageData.user == profileData.email ? "flex-end" : "flex-start",
        }}
      >
        <Text
          c={"dimmed"}
          size={"xs"}
          style={{ wordWrap: "break-word" }}
          w={"max-content"}
        >
          {messageData.user}
        </Text>
        <Flex direction={"column"}>
          <Text maw={300} style={{ wordWrap: "break-word" }} w={"max-content"}>
            {messageData.content}
          </Text>
          <Text
            c={"dimmed"}
            size={"xs"}
            ta={"right"}
            m={"-8px"}
            style={{ wordWrap: "break-word" }}
          >
            {new Date(messageData.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Flex>
      </Paper>
    </>
  );
}
