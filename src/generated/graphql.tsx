import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ant = {
  __typename?: "Ant";
  /** The name of the ant */
  name: Scalars["String"];
  /** The length of the ant in millimetres */
  length: Scalars["Int"];
  /** The color of the ant */
  color: AntColor;
  /** The weigt of the ant in milligrams */
  weight: Scalars["Int"];
};

export enum AntColor {
  Black = "BLACK",
  Red = "RED",
  Silver = "SILVER",
}

export type Query = {
  __typename?: "Query";
  /** A list of competing ants */
  ants: Maybe<Ant>[];
};

export type AntsQueryVariables = Exact<{ [key: string]: never }>;

export type AntsQuery = { __typename?: "Query" } & {
  ants: Maybe<
    { __typename?: "Ant" } & Pick<Ant, "name" | "length" | "color" | "weight">
  >[];
};

export const AntsDocument = gql`
  query Ants {
    ants {
      name
      length
      color
      weight
    }
  }
`;

/**
 * __useAntsQuery__
 *
 * To run a query within a React component, call `useAntsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAntsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAntsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAntsQuery(
  baseOptions?: Apollo.QueryHookOptions<AntsQuery, AntsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AntsQuery, AntsQueryVariables>(AntsDocument, options);
}
export function useAntsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AntsQuery, AntsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AntsQuery, AntsQueryVariables>(
    AntsDocument,
    options
  );
}
export type AntsQueryHookResult = ReturnType<typeof useAntsQuery>;
export type AntsLazyQueryHookResult = ReturnType<typeof useAntsLazyQuery>;
export type AntsQueryResult = Apollo.QueryResult<AntsQuery, AntsQueryVariables>;
