import React from "react";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfile, selectProfile} from "@/features/profileSlice";
import PageLoader from "../UI/PageLoader";

const NotLoggedInRequired = (props) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const {data: profileData, status: profileStatus} = useSelector(selectProfile);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [dispatch, profileData, profileStatus]);

  if (profileStatus === "succeeded") {
    router.push("/dashboard");
    return null;
  }
  if (profileStatus === "failed") {
    return <>{props.children}</>;
  }
  return <PageLoader />;
};

export default NotLoggedInRequired;
