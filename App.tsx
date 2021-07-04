import "react-native-gesture-handler";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";

import { Navigation } from "./components/Navigation";
import { useCachedResources } from "./hooks/useCachedResources";
import { LoadingScreen } from "./screens/Loading.screen";
import { theme } from "./theme";

const client = new ApolloClient({
  uri: "https://sg-ants-server.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const fontsLoaded = useCachedResources();

  if (fontsLoaded) {
    return <LoadingScreen screen="app" />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Navigation />
        </ApolloProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
