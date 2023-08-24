import GroupPage from "@/components/GroupPage";
import PageLoader from "@/components/UI/PageLoader";
import LoginRequired from "@/components/loginAndAuth/LoginRequired";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroups } from "@/features/groupSlice";
import { useEffect } from "react";

export default function Group_name() {
  return (
    <LoginRequired>
      <GroupPage />
    </LoginRequired>
  );
}
