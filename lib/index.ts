import { AntWithScore } from "../hooks/useAnts";

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

// Come back to this
export function exists<T>(value: T | null | undefined): value is T {
  return value === (value ?? !value);
}

const sortAntByScore = (a: AntWithScore, b: AntWithScore) => {
  if (a.score < b.score) {
    return 1;
  } else if (a.score > b.score) {
    return -1;
  } else {
    return 0;
  }
};

export const sortAndOrderAntScores = (ants: AntWithScore[]) => {
  const withScore = ants.filter((ant) => typeof ant.score === "number");
  const withoutScore = ants.filter((ant) => typeof ant.score === "string");
  return [...withScore.sort(sortAntByScore), ...withoutScore];
};
