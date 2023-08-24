import {
  Badge,
  Center,
  Flex,
  ScrollArea,
  SegmentedControl,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import ChatMessage from "./chatMessage";
import { useSelector } from "react-redux";
import { selectMessages } from "@/features/messageSlice";

export default function ChatHero({
  socketData,
  setSocketMsgType,
  chatId,
  segmented,
  setSegmented,
}) {
  const { data: groupMessages } = useSelector(selectMessages);
  const [renderedMessages, setRenderedMessages] = useState([]);

  useEffect(() => {
    if (segmented === "MSG") {
      setRenderedMessages([
        ...(groupMessages[chatId]?.messages || []),
        ...(socketData
          .filter((el) => el.message.type == "MSG")
          .map((el) => el.message) || []),
      ]);
    } else {
      setRenderedMessages([
        ...(groupMessages[chatId]?.isp || []),
        ...(socketData
          .filter((el) => el.message.type == "ISP")
          .map((el) => el.message) || []),
      ]);
    }
  }, [groupMessages[chatId], socketData, segmented]);

  return (
    <>
      <Center m={0}>
        <SegmentedControl
          m={0}
          onChange={(e) => {
            setSegmented(e);
            setSocketMsgType(e);
          }}
          data={[
            { label: "Messages", value: "MSG" },
            { label: "Issues/Permission", value: "ISP" },
          ]}
        />
      </Center>
      <ScrollArea pb={30} offsetScrollbars h={"80vh"} mt={10}>
        <Flex direction="column" gap={5}>
          {renderedMessages.map((el, index) => {
            return (
              <ChatMessage messageData={el} segmented={segmented} key={index} />
            );
          })}
        </Flex>
      </ScrollArea>
    </>
  );
}
