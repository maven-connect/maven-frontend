import { Flex, Group, Select, TextInput, UnstyledButton } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import React, { useState } from "react";

export default function ChatInput({
  sendMessage,
  segmented,
  ISSPER,
  setISSPER,
}) {
  const [messageInput, setmessageInput] = useState("");
  return (
    <>
      <form
        style={{ width: "100%" }}
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage(messageInput);
          setmessageInput("");
        }}
        autoComplete="off"
      >
        <Flex justify={"flex-start"} px={25} gap={25} pt={10} wrap={"nowrap"}>
          <TextInput
            rightSection={
              <UnstyledButton type="submit">
                <IconSend color="green" />
              </UnstyledButton>
            }
            value={messageInput}
            onChange={(event) => setmessageInput(event.currentTarget.value)}
            w={"75%"}
            placeholder="Send message"
            size="md"
          />
          {segmented == "ISP" && (
            <Select
              w={"15%"}
              miw={100}
              size="md"
              value={ISSPER}
              onChange={(val) => setISSPER(val)}
              data={[
                { value: "ISS", label: "ISSUE" },
                { value: "PER", label: "PERMISSION" },
              ]}
              styles={{ input: { fontSize: "0.9em" } }}
            />
          )}
        </Flex>
      </form>
    </>
  );
}
