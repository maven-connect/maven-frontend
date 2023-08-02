import { Flex } from "@mantine/core";
import AppShellComp from "./UI/AppShell";
import ChatInput from "./UI/chat/chatInput";
import ChatHero from "./UI/chat/chatHero";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "@/features/profileSlice";
import { fetchMessages } from "@/features/messageSlice";
import { useRouter } from "next/router";
import { fetchGroups, selectGroups } from "@/features/groupSlice";
import PageLoader from "./UI/PageLoader";

const socket = new WebSocket(process.env.NEXT_PUBLIC_BACKEND_SOCKET);

export default function GroupPage({}) {
  const [SocketState, setSocketState] = useState(null);
  const [socketMsgType, setSocketMsgType] = useState("MSG");
  const [socketData, setsocketData] = useState([]);
  const { data: profileData } = useSelector(selectProfile);
  const dispatch = useDispatch();
  const { data: groupList, status } = useSelector(selectGroups);
  const [segmented, setSegmented] = useState("MSG");
  const [ISSPER, setISSPER] = useState("ISS");

  const router = useRouter();

  function sendMessage(messageInput) {
    socket.send(
      JSON.stringify({
        message: messageInput,
        groupName: router.query.group_name,
        sender: profileData.email,
        type: socketMsgType,
        category: socketMsgType == "ISP" ? ISSPER : null,
      })
    );
  }

  socket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    if (data.message.groupName === router.query.group_name) {
      setsocketData((pre) => [...pre, data]);
    }
  };

  useEffect(() => {
    if (router.query.group_name && status === "succeeded") {
      setsocketData([]);
      dispatch(fetchMessages({ groupName: router.query.group_name }));
    }
  }, [router.query, status, dispatch]);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (!router.isReady || !groupList.length) {
    return <PageLoader />;
  }
  if (
    groupList.find((el) => el.name === router.query.group_name) === undefined
  ) {
    router.push("/dashboard");
    return null;
  }

  return (
    <AppShellComp groupTitle={router.query.group_name}>
      <Flex direction="column" h="90%" style={{ position: "relative" }}>
        <ChatHero
          socketData={socketData}
          setSocketMsgType={setSocketMsgType}
          segmented={segmented}
          setSegmented={setSegmented}
          chatId={router.query.group_name}
        />
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            width: "-webkit-fill-available",
          }}
        >
          <ChatInput
            sendMessage={sendMessage}
            segmented={segmented}
            ISSPER={ISSPER}
            setISSPER={setISSPER}
          />
        </div>
      </Flex>
    </AppShellComp>
  );
}
