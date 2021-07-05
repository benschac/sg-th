import React from "react";

import { Ant, useAntsQuery } from "../generated/graphql";
import { exists, sortAndOrderAntScores, winLikelyHood } from "../lib/index";

export type AntWithScore = Ant & {
  score: "not yet run" | "in progress" | number;
};

export function useAnts() {
  const { data, loading } = useAntsQuery();
  const [ants, setAnts] = React.useState<AntWithScore[]>([]);
  const [loadingScores, setLoadingScores] = React.useState(false);

  React.useEffect(() => {
    const response = data?.ants
      // If you're getting a response, you shouldn't get [Ant, null, Ant]
      // The client expects [Ant, Ant, Ant]
      // There should be a filter on the backend to prevent client side filtering.
      .filter(exists)
      .map((ant) => ({ ...ant, score: "not yet run" })) as AntWithScore[];

    setAnts(response);
  }, [data?.ants]);

  const getScores = React.useCallback(() => {
    const scores: Promise<void>[] = [];
    setLoadingScores(true);
    ants.forEach((ant, index) => {
      scores.push(getSortedAntScoreAsync(ant, index));
    });

    Promise.all(scores).then(() => {
      setLoadingScores(false);
    });
  }, [ants]);

  const getSortedAntScoreAsync = async (
    ant: AntWithScore,
    index: number
  ): Promise<void> => {
    ants[index] = { ...ant, score: "in progress" };
    setAnts(ants);

    const winScore = await winLikelyHood();

    // Values could have changed since value was awaited.
    // get updated index to set correct score on ant.
    const sortedIndex = ants.findIndex((a) => a.name === ant.name);
    ants[sortedIndex] = { ...ant, score: winScore };

    setAnts(sortAndOrderAntScores(ants));
  };

  return { ants, getScores, loadingAnts: loading, loadingScores };
}
