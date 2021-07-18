import { Formik } from "formik";
import React from "react";

import { Button } from "../components/Button.component";
import { Layout } from "../components/Layout.component";
import { Display, Input } from "../components/Typography.component";
import { useAuthStore } from "../stores/auth.store";

export const SignInScreen: React.FC = () => {
  const [password, setPassword] = React.useState("");
  const signIn = useAuthStore(React.useCallback((state) => state.signIn, []));

  return (
    <Layout.ScreenContainer grow center bg="white">
      <Layout.Column style={{ width: 300 }}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) =>
            signIn({ username: values.username, password: values.password })
          }
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Layout.Row>
                <Input
                  grow
                  center
                  size="xxl-48"
                  placeholder="Username"
                  value={values.username}
                  onBlur={handleBlur("username")}
                  onChangeText={handleChange("username")}
                />
              </Layout.Row>
              <Layout.Row py>
                <Input
                  grow
                  center
                  size="xxl-48"
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </Layout.Row>
              <Layout.Row center>
                <Button onPress={handleSubmit}>
                  <Display color="white">Sign In</Display>
                </Button>
              </Layout.Row>
            </>
          )}
        </Formik>
      </Layout.Column>
    </Layout.ScreenContainer>
  );
};
