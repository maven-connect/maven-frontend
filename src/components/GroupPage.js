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

const url = `ws://localhost:8000/ws/chat/`;
const socket = new WebSocket(url);

export default function GroupPage({}) {
  const [SocketState, setSocketState] = useState(null);
  const [socketData, setsocketData] = useState([]);
  const { data: profileData } = useSelector(selectProfile);
  const dispatch = useDispatch();
  const { data: groupList, status } = useSelector(selectGroups);
  const router = useRouter();

  function sendMessage(messageInput) {
    socket.send(
      JSON.stringify({
        message: messageInput,
        groupName: router.query.group_name,
        sender: profileData.email,
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
    if (router.query.group_name && status == "succeeded") {
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
    groupList.find((el) => el.name == router.query.group_name) === undefined
  ) {
    router.push("/dashboard");
    return null;
  }

  return (
    <AppShellComp>
      <Flex direction={"column"} h={"100%"} justify={"flex-end"} p={"sm"}>
        <ChatHero socketData={socketData} chatId={router.query.group_name} />
        <ChatInput sendMessage={sendMessage} />
      </Flex>
    </AppShellComp>
  );
}
