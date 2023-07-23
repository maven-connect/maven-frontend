import { Flex, ScrollArea } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import ChatMessage from "./chatMessage";
import { useSelector } from "react-redux";
import { selectMessages } from "@/features/messageSlice";

export default function ChatHero({ socketData, chatId }) {
  const { data: groupMessages } = useSelector(selectMessages);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Scroll to the last message when new messages arrive
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [groupMessages[chatId], socketData]);

  return (
    <ScrollArea pb={45}>
      <Flex direction="column" gap={5}>
        {groupMessages[chatId] &&
          groupMessages[chatId].map((el, index) => (
            <ChatMessage
              messageData={el}
              key={index}
              // Set the ref to the last message
              ref={groupMessages[chatId].length - 1 === index ? lastMessageRef : null}
            />
          ))}
        {socketData.map((el, index) => (
          <ChatMessage
            messageData={el.message}
            key={index}
            // Set the ref to the last message
            ref={socketData.length - 1 === index ? lastMessageRef : null}
          />
        ))}
        {/* The ref is attached to an empty div */}
        <div ref={lastMessageRef} />
      </Flex>
    </ScrollArea>
  );
}
