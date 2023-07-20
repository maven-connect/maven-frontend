import { selectProfile } from "@/features/profileSlice";
import { Group, Paper, Text } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

export default function ChatMessage({ messageData }) {
  const { data: profileData } = useSelector(selectProfile);

  return (
    <Paper
      shadow="lg"
      h={"min-content"}
      withBorder
      w={"max-content"}
      radius={"md"}
      p={"sm"}
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
      <Group>
        <Text maw={300} style={{ wordWrap: "break-word" }} w={"max-content"}>
          {messageData.content}
        </Text>
        <Text
          c={"dimmed"}
          size={"xs"}
          style={{ wordWrap: "break-word" }}
          w={"max-content"}
        >
          {messageData.timestamp}
        </Text>
      </Group>
    </Paper>
  );
}
