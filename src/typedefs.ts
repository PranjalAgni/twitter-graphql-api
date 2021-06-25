import { gql } from "apollo-server";

export default gql`
  type Query {
    getTweets(tweetId: String!): [TweetCreated]!
    convertRomanNumberToNumeral(romanNumber: String!): String!
  }

  type Mutation {
    createTweet(tweets: [CreateTweetInput!]!): [TweetCreated!]!
    createUser(user: CreateUserInput): User!
  }

  type User {
    _id: ID!
    username: String!
    phoneNumber: String!
  }

  type Tweet {
    description: String!
    createdAt: String!
    user: User!
  }

  type TweetCreated {
    _id: ID!
    description: String!
    createdAt: String!
    userId: String!
  }

  input CreateTweetInput {
    description: String!
    userId: String!
  }

  input CreateUserInput {
    username: String!
    phoneNumber: String!
  }
`;
