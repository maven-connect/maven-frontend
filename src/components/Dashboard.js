import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroups } from "@/features/groupSlice";
import AppShellComp from "./UI/AppShell";

export default function DashboardPage() {
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return <AppShellComp>{JSON.stringify(groups.data)}</AppShellComp>;
}
