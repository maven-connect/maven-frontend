import React, {useEffect} from "react";
import Navbar from "./UI/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectGroups} from "@/features/groupSlice";

export default function DashboardPage() {
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <div>
      <Navbar />
      {JSON.stringify(groups.data)}
    </div>
  );
}
