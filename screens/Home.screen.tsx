import { MotiView } from "moti";
import React from "react";
import { FlatList } from "react-native-gesture-handler";

// import { AnimatedAnt } from "../components/AnimatedAnt.component";
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

  // const antAnimation = React.useMemo(
  //   () => (
  //     <>
  //       <AnimatedAnt delay={100} duration={3400} />
  //       <AnimatedAnt delay={110} duration={3500} />
  //       <AnimatedAnt delay={115} duration={3400} />
  //     </>
  //   ),
  //   []
  // );

  if (loadingAnts) {
    return (
      <Layout.ScreenContainer bg="white" grow>
        <LoadingScreen screen="Home Screen" />
      </Layout.ScreenContainer>
    );
  }

  return (
    <Layout.ScreenContainer bg="white" grow>
      <Layout.Row py px center>
        <Display color="grey" size="l-24">
          Ants
        </Display>

        <Spacer.Flex />
        {/* Use blue bird or throw in a cb function to cancel Promise */}
        {!loadingScores && (
          <Button disabled={loadingScores} onPress={signOut}>
            <Display color="white">Sign out</Display>
          </Button>
        )}
      </Layout.Row>

      <Layout.Column px py>
        <Button onPress={getScores}>
          <Display color="white">
            {loadingScores ? "Loading..." : "Calculate Scores"}
          </Display>
        </Button>
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
        >
          <FlatList
            data={ants}
            keyExtractor={(item) => item.name}
            renderItem={({ item: ant }) => (
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
                  <Display>
                    score:{" "}
                    {typeof ant?.score === "object" ? "in progress" : ant.score}
                  </Display>
                </Layout.Row>
              </Layout.Column>
            )}
          />
        </MotiView>
      </Layout.Column>
    </Layout.ScreenContainer>
  );
};
