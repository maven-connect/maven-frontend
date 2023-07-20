import { Flex, ScrollArea } from "@mantine/core";
import React from "react";
import ChatMessage from "./chatMessage";
import { useSelector } from "react-redux";
import { selectMessages } from "@/features/messageSlice";

export default function ChatHero({ socketData, chatId }) {
  const { data: groupMessages } = useSelector(selectMessages);
  return (
    <ScrollArea pr={25}>
      <Flex direction="column" gap={10}>
        {groupMessages[chatId] &&
          groupMessages[chatId].map((el, index) => (
            <ChatMessage messageData={el} key={index} />
          ))}
        {socketData.map((el, index) => (
          <ChatMessage messageData={el.message} key={index} />
        ))}
      </Flex>
    </ScrollArea>
  );
}
