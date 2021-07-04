import React from "react";

import {
  sortAntByScore,
  winLikelyHood,
} from "../lib/generateAntWinLikelihoodCalculator";
import { Ant, useAntsQuery } from "../src/generated/graphql";

export type AntWithScore = Ant & {
  score: "not yet run" | "in progress" | number;
};

export function useAnts() {
  const { data } = useAntsQuery();
  const [ants, setAnts] = React.useState<AntWithScore[]>([]);

  React.useEffect(() => {
    const response = data?.ants
      // There's a bug in the API.
      // If you're getting a response, you shouldn't get [Ant, null, Ant]
      // The client expects [Ant, Ant, Ant]
      .filter((ant) => !!ant)
      .map((ant) => ({ ...ant, score: "not yet run" })) as AntWithScore[];

    setAnts(response);
  }, [data?.ants]);

  const getScores = React.useCallback(() => {
    ants.forEach(getScore);
  }, []);

  const getScore = async (ant: AntWithScore) => {
    const index = ants.findIndex((a) => a.name === ant.name);
    ants[index] = { ...ant, score: "in progress" };
    setAnts(ants);

    ants[index] = { ...ant, score: await winLikelyHood() };

    const withScore = ants.filter((ant) => typeof ant.score === "number");
    const withoutScore = ants.filter((ant) => typeof ant.score === "string");

    setAnts([...withScore.sort(sortAntByScore), ...withoutScore]);
  };

  return { ants, getScores };
}
