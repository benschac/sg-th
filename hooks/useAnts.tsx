import React from "react";

import { Ant, useAntsQuery } from "../generated/graphql";
import { exists, sortAndOrderAntScores, winLikelyHood } from "../lib/index";

export type AntWithScore = Ant & {
  score?: number;
  status: "not yet run" | "in progress" | "finished";
};

export function useAnts() {
  const { data, loading } = useAntsQuery();
  const [ants, setAnts] = React.useState<AntWithScore[]>([]);
  const [loadingScores, setLoadingScores] = React.useState(false);

  React.useEffect(() => {
    const response =
      data?.ants
        // If you're getting a response, you shouldn't get [Ant, null, Ant]
        // The client expects [Ant, Ant, Ant]
        // There should be a filter on the backend to prevent client side filtering.
        .filter(exists)
        .map((ant) => ({ ...ant, status: "not yet run" } as const)) ?? [];

    setAnts(response);
  }, [data?.ants]);

  const getScores = React.useCallback(async () => {
    setLoadingScores(true);
    setAnts((prev) => prev.map((a) => ({ ...a, status: "in progress" })));

    // Would you get stale ants?
    const scorePromisees = ants.map(async (ant) => {
      const score = await getAndSortScoreAsync(ant);
      return {
        ...ant,
        status: "finished",
        score,
      } as const;
    });
    const scores = await Promise.all(scorePromisees);
    setAnts(scores);

    setLoadingScores(false);
  }, [ants]);

  const getAndSortScoreAsync = async (ant: AntWithScore): Promise<number> => {
    const winScore = await winLikelyHood();

    setAnts((prevAnts) => {
      // Make sure we're not mutating state.
      // Ever.
      return sortAndOrderAntScores([
        ...prevAnts.filter((a) => a.name !== ant.name),
        { ...ant, score: winScore },
      ]);
    });

    return winScore;
  };

  return {
    ants,
    getScores: loadingScores ? undefined : getScores,
    loadingAnts: loading,
    loadingScores,
  };
}
