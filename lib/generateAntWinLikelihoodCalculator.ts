import { AntWithScore } from "../hooks/useAnts";

export function generateAntWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

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

export const sortAntByScore = (a: AntWithScore, b: AntWithScore) => {
  if (typeof a.score === "string") {
    return 0;
  } else if (a.score < b.score) {
    return 1;
  } else if (a.score > b.score) {
    return -1;
  } else {
    return 0;
  }
};
