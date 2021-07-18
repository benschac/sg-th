# The Requirements

## Overview

Hello! We want to get a sense of how you solve problems in the front-end using React Native, and to do so we ask that you complete this take-home coding challenge.

The expected time to complete everything in the Must Haves is 4-5 hours. Please keep this in mind. The time limit is as much for you, the candidate, to show off what you can do given myriad constraints as it is for us, the interviewers, to consider the finished product built under said constraints.

The challenge is to build a very special app for purveyors of the competitive ant racing scene, who wish to view statistics related to competing ants before races take place.

## The Challenge

Here are the specifications provided by our stakeholders:

- Information about competing ants must be acquired from a GraphQL API located at the following endpoint: [https://sg-ants-server.herokuapp.com/graphql](https://sg-ants-server.herokuapp.com/graphql). Being a free-tier Heroku project, please give it a bit to spin back up in the event it's been idle for an extended period of time.
- All available information on the ants should be displayed in a pleasing UI designed at your discretion.
- You must provide a way for users to calculate the odds of each ant winning. We have provided the function which provides the means to calculate the likelihood of an ant winning below (see 'Ant-win likelihood algorithm'), which you must use as-is.

### Ant-win likelihood algorithm

```
function generateAntWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  return (callback) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}

```

### Must Haves

2-3 hours:

- Users must be able to begin running calculations on all ants simultaneously.
- UI must reflect the state of each ant's win likelihood calculation (not yet run, in progress, calculated, etc.)
- UI must display the state of _all_ tests together (not yet run, in progress, all calculated).
- As the results come in, ants must be ordered by their calculated likelihood of winning.

1-2 additional hours:

- Include a login/logout feature: open-ended on how to implement, and can be local-storage only. Being logged in enables the ability to query the GraphQL endpoint to display the requirements.
- When logged in, there should be images of three (3) ants moving horizontally from left to right across the bottom-most part of the screen; once an ant is out of the right side of the screen, it comes back on the left side of it, like in a carousel.

### Bonus Features

- Show `n` number of ants and tie the animation of each to its associated calculation via a method of your choosing
- Clever / aesthetically pleasing transitions

## Wrapping Up

- How you implement the app is up to your discretion.
- Please be resourceful!
- Please produce a codebase that, as closely as possible, reflects your production-level effort.
- When you're finished, please send us a link to your submission's GitHub repo, and instructions on how to run it.

![Screen Recording 2021-07-05 at 08 56 21 AM](https://user-images.githubusercontent.com/86967434/124478932-b30ec800-dd73-11eb-84ce-a9c113842fe7.gif)
![Screen Recording 2021-07-05 at 08 57 06 AM](https://user-images.githubusercontent.com/86967434/124478940-b609b880-dd73-11eb-9ba0-88427b784b21.gif)
![Screen Recording 2021-07-05 at 08 57 39 AM](https://user-images.githubusercontent.com/86967434/124478950-b7d37c00-dd73-11eb-9c86-20b273c6b5e9.gif)

### Run the project

`yarn && yarn start`

I boot-strapped the application with a starter using tools I use at work. Turbo-props is an open-source wrapper around styled-components we use in our day-to-day. Most of the setup was already done, so I could focus on coding.

- Code generation: A bit of overkill for something this small. Reading the introspection layer and getting a type-safe API response removes a whole crop of bugs and enforces consistency with their generated hooks.

- Turbo-props: Sensible defaults w/baked-in types from your theme.

- Zustand: For global level application state, zustand has grown on me quite a bit. It does a couple of things very well.

1. The API is very light; there's very little boilerplate.
2. It works outside of the React context.
3. They tackled the zombie child problem.
4. Doesn't use context.
5. Is reactive, mitigating unnecessary re-renders.

- Husky: Enforce type checking and linting before a commit.
- Moti: A library I use in production for animations.

Implementation:

- Updating state with a resolved ant score is a bit roundabout. In production, usually, a server's responses would be cached in Apollo and shown to the user. If this list were longer, I'd look for a different solution rather than updating the entire list in state O(n) times.
- Auth: Is completely mocked. No username or password is needed. Normally I would use something like Formik. With the time constraint, I didn't have time to set it up.
