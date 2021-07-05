import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import { Text } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";

import { Navigation } from "./components/Navigation";
import { useCachedResources } from "./hooks/useCachedResources";
import { theme } from "./theme";

const client = new ApolloClient({
  uri: "https://sg-ants-server.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const fontsLoaded = useCachedResources();

  if (fontsLoaded) {
    // If app hasn't loaded font's yet
    // use default
    return (
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
        }}
      >
        Loading...
      </Text>
    );
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
