import React from "react";

import { Button } from "../components/Button.component";
import { Layout } from "../components/Layout.component";
import { Display } from "../components/Typography.component";
import { useAnts } from "../hooks/useAnts";

export const HomeScreen: React.FC = () => {
  const { ants, getScores } = useAnts();

  return (
    <Layout.ScreenContainer bg="white" grow>
      <Layout.Row py justify align="flex-end">
        <Display color="grey" size="xl-28">
          Ants
        </Display>
      </Layout.Row>
      <Layout.Column px py>
        <Button onPress={() => getScores()}>
          <Display color="white">Calculate Scores</Display>
        </Button>
        {ants?.map((ant) => {
          return (
            <Layout.Column py="s-10" align key={ant?.name}>
              <Display>{ant?.name}</Display>
              <Layout.Row align>
                <Layout.Row>
                  <Display>weight: {ant?.weight} </Display>
                  <Display>length: {ant.length} </Display>
                  <Display>color: </Display>
                  <Display
                    style={{ color: `${ant.color.toLocaleLowerCase()}` }}
                  >
                    {ant.color}{" "}
                  </Display>
                </Layout.Row>
              </Layout.Row>
              <Layout.Row>
                <Display>score: {ant?.score}</Display>
              </Layout.Row>
            </Layout.Column>
          );
        }) ?? []}
      </Layout.Column>
    </Layout.ScreenContainer>
  );
};
