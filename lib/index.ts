import { Ant as RawAnt } from "../generated/graphql";
import { AntWithScore } from "../hooks/useAnts";

type Ant = RawAnt & {
  score: number;
  status: "not yet run" | "in progress" | "finished";
};

export function generateAntWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  // added a type just so typescript wouldn't throw an error
  return (callback: (likelihoodOfAntWinning: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}

export const winLikelyHood = () => {
  return new Promise<number>((res) => {
    generateAntWinLikelihoodCalculator()(res);
  });
};

export function exists<T>(value: T | null | undefined): value is T {
  return value === (value ?? !value);
}

const sortAntByScore = (a: Ant, b: Ant) => {
  if (a.score < b.score) {
    return 1;
  }

  if (a.score > b.score) {
    return -1;
  }

  return 0;
};

export const sortAndOrderAntScores = (ants: AntWithScore[]) => {
  const withScore = ants.filter((ant): ant is Ant => !!ant.score);
  const withoutScore = ants.filter((ant) => !ant.score);
  return [...withScore.sort(sortAntByScore), ...withoutScore];
};
