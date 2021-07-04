import React from "react";

import { Button } from "../components/Button.component";
import { Layout } from "../components/Layout.component";
import { Display, Input } from "../components/Typography.component";
import { useAuthStore } from "../stores/auth.store";

export const SignInScreen: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = useAuthStore();

  return (
    <Layout.ScreenContainer grow center bg="white">
      <Layout.Column px="xxl-48">
        <Layout.Row>
          <Input
            size="xxl-48"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </Layout.Row>
        <Layout.Row py>
          <Input
            size="xxl-48"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Layout.Row>

        <Layout.Row center>
          <Button onPress={() => signIn({ username, password })}>
            <Display color="white">Sign In</Display>
          </Button>
        </Layout.Row>
      </Layout.Column>
    </Layout.ScreenContainer>
  );
};
