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

export default function ChatHero({ socketData, setSocketMsgType, chatId }) {
  const { data: groupMessages } = useSelector(selectMessages);
  const [renderedMessages, setRenderedMessages] = useState([]);
  const [segmented, setSegmented] = useState("MSG");

  useEffect(() => {
    // Function to create the renderedMessages array
    const createRenderedMessages = (messages) => {
      const result = [];
      let currentDateString = null;

      messages.forEach((el, index) => {
        const currentMessageDate = new Date(el.timestamp);
        const prevDateString = currentDateString;
        currentDateString = currentMessageDate.toDateString();

        if (prevDateString !== currentDateString) {
          // Add the date badge before the message
          result.push(
            <Center key={`${el.timestamp}-${index}`}>
              <Badge color="yellow">
                {currentMessageDate.toLocaleDateString()}
              </Badge>
            </Center>
          );
        }

        // Add the message to the result array
        result.push(<ChatMessage messageData={el} key={el.timestamp} />);
      });

      return result;
    };

    // Update the renderedMessages array whenever groupMessages or socketData change
    if (segmented === "MSG") {
      setRenderedMessages([
        ...createRenderedMessages(groupMessages[chatId]?.messages || []),
        ...createRenderedMessages(socketData.map((el) => el.message) || []),
      ]);
    } else {
      setRenderedMessages([
        ...createRenderedMessages(groupMessages[chatId]?.isp || []),
        ...createRenderedMessages(socketData.map((el) => el.message) || []),
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
          {renderedMessages}
        </Flex>
      </ScrollArea>
    </>
  );
}
