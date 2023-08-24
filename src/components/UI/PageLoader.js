import { Loader } from "@mantine/core";
import React from "react";

const PageLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader />
    </div>
  );
};

export default PageLoader;
