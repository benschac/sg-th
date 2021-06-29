import { useNavigation } from "@react-navigation/native";
import React from "react";

import { Layout } from "../components/Layout.component";
import { Spacer } from "../components/Spacer.component";
import { Display, Text } from "../components/Typography.component";

export const SettingsScreen: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Layout.ScreenContainer bg="white" grow justify>
      {/* TODO: Check typescript docs on Navigation 6 */}
      {/* @ts-expect-error */}
      <Layout.PressableColumn px py onPress={() => navigate("Home")}>
        <Display size="xl-28">I am the Settings Screen</Display>
        <Text size="l-24">Press Me!</Text>
      </Layout.PressableColumn>
      <Layout.Column>
        <Spacer.Vertical size="l-24" />
      </Layout.Column>
      <Spacer.Horizontal size="l-24" />
    </Layout.ScreenContainer>
  );
};
