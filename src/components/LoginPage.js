import { fetchProfile } from "@/features/profileSlice";
import { googeLogin, loginSubmit } from "@/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
} from "@mantine/core";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const loginClick = () => {
    loginSubmit(email, password).then((res) => {
      if (res.ok) {
        dispatch(fetchProfile());
      } else {
        toast.error("incorrect password or email");
      }
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(document.getElementById("googleButton"), {
        theme: "outline",
        size: "large",
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleCredentialResponse = (response) => {
    const credential = response.credential;

    googeLogin(credential).then((res) => {
      if (res.ok) {
        dispatch(fetchProfile());
      } else {
        toast.error(res.data.error);
      }
    });
  };

  return (
    <>
      <Toaster></Toaster>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor
            onClick={() => router.push("/register")}
            size="sm"
            component="button"
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginClick();
            }}
          >
            <TextInput
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mantine.dev"
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              mt="md"
            />
            <Group position="apart" mt="lg">
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
          <Center m={5}>
            {" "}
            <Text>or</Text>{" "}
          </Center>
          <Center>
            <div id="googleButton"></div>
          </Center>
        </Paper>
      </Container>
    </>
  );
}
