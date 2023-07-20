import { Group, TextInput, UnstyledButton } from "@mantine/core";
import { IconPaperclip, IconSend } from "@tabler/icons-react";
import React, { useState } from "react";

export default function ChatInput({ sendMessage }) {
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
        <Group align="center" position="apart">
          <TextInput
            rightSection={
              <UnstyledButton type="submit">
                <IconSend color="green" />
              </UnstyledButton>
            }
            value={messageInput}
            onChange={(event) => setmessageInput(event.currentTarget.value)}
            w={"90%"}
            placeholder="Send message"
            size="md"
          />
          <IconPaperclip />
        </Group>
      </form>
    </>
  );
}
