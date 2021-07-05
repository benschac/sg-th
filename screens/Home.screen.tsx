import { View as MotiView, AnimatePresence } from "moti";
import React from "react";

import { AnimatedAnt } from "../components/AnimatedAnt.component";
import { Button } from "../components/Button.component";
import { Layout } from "../components/Layout.component";
import { Spacer } from "../components/Spacer.component";
import { Display, Text } from "../components/Typography.component";
import { useAnts } from "../hooks/useAnts";
import { useAuthStore } from "../stores/auth.store";
import { LoadingScreen } from "./Loading.screen";

export const HomeScreen: React.FC = () => {
  const { ants, getScores, loadingAnts, loadingScores } = useAnts();
  const signOut = useAuthStore(React.useCallback((state) => state.signOut, []));
  const [, setAnimateIn] = React.useState(false);

  React.useEffect(() => {
    setAnimateIn(true);
  }, []);

  const antAnimation = React.useMemo(
    () => (
      <>
        <AnimatedAnt delay={100} duration={3400} />
        <AnimatedAnt delay={110} duration={3500} />
        <AnimatedAnt delay={115} duration={3400} />
      </>
    ),
    []
  );

  if (loadingAnts) {
    return (
      <Layout.ScreenContainer bg="white" grow>
        <LoadingScreen screen="Home Screen" />
      </Layout.ScreenContainer>
    );
  }

  return (
    <Layout.ScreenContainer bg="white" grow>
      <AnimatePresence>
        <MotiView
          from={{
            opacity: 0,
            translateY: -150,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          exit={{
            opacity: 0,
            translateY: -100,
          }}
        >
          <Layout.Row py px center>
            <Display color="grey" size="l-24">
              Ants
            </Display>

            <Spacer.Flex />
            <Button onPress={() => signOut()}>
              <Display color="white">Sign out</Display>
            </Button>
          </Layout.Row>
        </MotiView>
      </AnimatePresence>

      <Layout.Column px py>
        <Button onPress={() => !loadingScores && getScores()}>
          <Display color="white">
            {loadingScores ? "Loading..." : "Calculate Scores"}
          </Display>
        </Button>
        {ants?.map((ant) => {
          return (
            <MotiView
              from={{
                opacity: 0,
                translateY: -100,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              exit={{
                opacity: 0,
                translateY: -100,
              }}
              key={ant?.name}
            >
              <Layout.Column py="s-10" align>
                <Display weight="bold">{ant?.name}</Display>
                <Layout.Row align>
                  <Layout.Row>
                    <Text>weight: {ant?.weight} </Text>
                    <Text>length: {ant.length} </Text>
                    <Text>color: </Text>
                    <Text style={{ color: `${ant.color.toLocaleLowerCase()}` }}>
                      {ant.color}{" "}
                    </Text>
                  </Layout.Row>
                </Layout.Row>
                <Layout.Row>
                  <Display>score: {ant?.score}</Display>
                </Layout.Row>
              </Layout.Column>
            </MotiView>
          );
        })}
      </Layout.Column>
      <Layout.Row absolute={{ bottom: 0, left: 0, right: 0 }}>
        {antAnimation}
      </Layout.Row>
    </Layout.ScreenContainer>
  );
};
