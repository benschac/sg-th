import React from "react";

import { Layout } from "../components/Layout.component";
import { Display } from "../components/Typography.component";

type LoadingProps = {
  screen: string;
};

export const LoadingScreen: React.FC<LoadingProps> = (props) => {
  const { screen } = props;
  return (
    <Layout.Column grow center>
      <Display accessibilityLabel={`loading ${screen}`}>Loading...</Display>
    </Layout.Column>
  );
};
