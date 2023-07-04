import {fetchProfile} from "@/features/profileSlice";
import {verifyProfile} from "@/pages/api/api";
import {Center, Flex, Select} from "@mantine/core";
import React, {useState} from "react";
import {Toaster, toast} from "react-hot-toast";

const branches = [
  {
    value: "CS",
    label: "Computer Science",
  },
  {
    value: "ECE",
    label: "Electronics and Communication",
  },
  {
    value: "MECH",
    label: "Mechanical",
  },
  {
    value: "SM",
    label: "Smart Manufacturing",
  },
  {
    value: "DS",
    label: "Design",
  },
];

export default function VerifyPage() {
  const [selectedBranch, setSelectedBranch] = useState("CS");
  const [batch, setBatch] = useState("2021");

  const verifySubmit = () => {
    verifyProfile(selectedBranch, batch).then((res) => {
      if (res.ok) {
        fetchProfile();
      } else {
        // toast.error(res.data.error);
      }
    });
  };

  return (
    <>
      <Toaster></Toaster>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Complete your Profile
          </h2>
        </div>
        <Select
          mt={50}
          label="Branch"
          w={320}
          data={branches}
          onChange={(val) => setSelectedBranch(val)}
        />
        <Select
          mt={25}
          label="Batch"
          w={320}
          data={["2018", "2019", "2020", "2021", "2022"]}
          onChange={(val) => setBatch(val)}
        />
        <button
          onClick={() => {
            verifySubmit();
          }}
          className="flex w-80 mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </>
  );
}
