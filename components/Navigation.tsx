import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { HomeScreen } from "../screens/Home.screen";
import { SignInScreen } from "../screens/SignIn.screen";
import { useAuthStore } from "../stores/auth.store";
import { Layout } from "./Layout.component";
import { Display } from "./Typography.component";
const AppStack = createStackNavigator();

export const Navigation: React.FC = () => {
  const { loading, token, initialAuth } = useAuthStore();

  React.useEffect(() => {
    initialAuth();
  }, []);

  if (loading) {
    return (
      <Layout.ScreenContainer bg="white">
        <Layout.Column grow center>
          <Display size="l-24">Loading...</Display>
        </Layout.Column>
      </Layout.ScreenContainer>
    );
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!token ? (
          <AppStack.Screen name="Signin" component={SignInScreen} />
        ) : (
          <AppStack.Screen name="Home" component={HomeScreen} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
