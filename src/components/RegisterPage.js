import { fetchProfile } from "@/features/profileSlice";
import { registerSubmit } from "@/pages/api/api";
import {
  Button,
  Center,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const registerClick = () => {
    registerSubmit(email, password).then((res) => {
      if (res.ok) {
        router.push("/login");
      } else {
        console.log(res);
        toast.error(res.data);
      }
    });
  };

  return (
    <>
      <Toaster></Toaster>
      <Center>
        <Paper
          w={420}
          my={40}
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
        >
          <div>
            <div>
              <h2>Create new account</h2>
            </div>

            <div>
              <form
                action="#"
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  registerClick();
                }}
              >
                <div>
                  <TextInput
                    mt={10}
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <PasswordInput
                    mt={10}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Flex justify={"end"}>
                    <Button mt={10} type="submit">
                      Register
                    </Button>
                  </Flex>
                </div>
              </form>
              <div>
                <Text>Have an account?</Text>
                <Link href={"/login"}>
                  <Button>Sign In</Button>
                </Link>
              </div>
            </div>
          </div>
        </Paper>
      </Center>
    </>
  );
}
