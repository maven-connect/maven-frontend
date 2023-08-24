import React from "react";
import LoginRequired from "@/components/loginAndAuth/LoginRequired";
import VerifyPage from "@/components/VerifyPage";

const verify = () => {
  return (
    <LoginRequired>
      <VerifyPage />
    </LoginRequired>
  );
};

export default verify;
