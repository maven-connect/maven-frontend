import LostAndFoundPage from "@/components/LostAndFoundPage";
import AppShellComp from "@/components/UI/AppShell";
import LoginRequired from "@/components/loginAndAuth/LoginRequired";
import React from "react";

function lostfound() {
  return (
    <LoginRequired>
      <AppShellComp>
        <LostAndFoundPage />
      </AppShellComp>
    </LoginRequired>
  );
}

export default lostfound;
