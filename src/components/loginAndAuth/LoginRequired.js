import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, selectProfile } from "@/features/profileSlice";
import PageLoader from "../UI/PageLoader";

const LoginRequired = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: profileData, status } = useSelector(selectProfile);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile());
    }
  }, [dispatch, profileData, status]);

  if (status === "loading") {
    return <PageLoader />;
  }

  if (profileData && status === "failed") {
    router.push("/login");
    return null;
  }
  if (status === "succeeded") {
    if (profileData.verified) {
      if (router.pathname === "/verify") {
        router.push("/dashboard");
        return null;
      }
      return <>{children}</>;
    } else {
      if (router.pathname === "/verify") {
        return <>{children}</>;
      } else {
        router.push("/verify");
        return null;
      }
    }
  }
};

export default LoginRequired;
