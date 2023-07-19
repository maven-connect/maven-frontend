import { fetchProfile } from "@/features/profileSlice";
import { verifyProfile } from "@/pages/api/api";
import {
  Anchor,
  Button,
  Center,
  Container,
  Flex,
  Paper,
  Select,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

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
      <Container size={420} my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 500,
            })}
          >
            Complete your Profile
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Select the branch and the batch below
          </Text>

          <form>
            <Select
              mt={10}
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
            <Button
              mt={10}
              onClick={() => {
                verifySubmit();
              }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
