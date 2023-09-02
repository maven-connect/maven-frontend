import GroupInfoPage from "@/components/GroupInfoPage";
import LoginRequired from "@/components/loginAndAuth/LoginRequired";
import { useRouter } from "next/router";
import React from "react";

const info = () => {

  return (
    <LoginRequired>
      <GroupInfoPage />
    </LoginRequired>
  );
};

export default info;
