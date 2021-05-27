import { gql } from "apollo-server";

export default gql`
  type Query {
    createTweet(tweets: [CreateTweetInput!]!): [TweetCreated!]!
    getTweets(tweetId: String!): [TweetCreated]!
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
