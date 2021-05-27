/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, LeanDocument } from "mongoose";
import { CreateTweet, CreateUser } from "./interfaces/";
import Tweet, { ITweet } from "./models/Tweet";
import User, { IUser } from "./models/User";

export default {
  Query: {
    getTweets: async (
      _parent: never,
      args: { tweetId: string }
    ): Promise<LeanDocument<ITweet>[] | []> => {
      try {
        const { tweetId } = args;
        console.log("Fetching tweetId = ", tweetId);
        const parentTweet = await Tweet.findById({ _id: tweetId });
        let allTweets = [parentTweet];
        if (parentTweet) {
          const childIds = parentTweet.threadId;
          if (childIds.length > 0) {
            const childTweets = await Tweet.find({ _id: { $in: childIds } });
            console.log(childTweets);
            allTweets = [...allTweets, ...childTweets];
          }
        }
        if (!parentTweet) return [];
        return allTweets.map((doc) => doc.toObject());
      } catch (ex) {
        console.error(ex);
      }
    }
  },
  Mutation: {
    createUser: async (
      _parent: never,
      args: { user: CreateUser }
    ): Promise<LeanDocument<IUser>> => {
      try {
        const { username, phoneNumber } = args.user;
        const user = new User({ username, phoneNumber });
        const userCreated = await user.save();
        return userCreated.toObject();
      } catch (ex) {
        console.error(ex);
      }
    },
    createTweet: async (
      _parent: never,
      args: { tweets: CreateTweet[] }
    ): Promise<LeanDocument<ITweet>[]> => {
      try {
        const tweetList = args.tweets;
        const [parentTweet, ...remaningTweet] = tweetList;
        const { description, userId } = parentTweet;
        const tweet = new Tweet({
          description,
          userId
        });
        let savedTweet = await tweet.save();
        let childTweets: (ITweet & Document<string, unknown>)[] = [];
        if (remaningTweet) {
          childTweets = await Tweet.insertMany(remaningTweet);
          const childTweetsId: string[] = childTweets.map((tweet) => tweet._id);

          savedTweet = await Tweet.findByIdAndUpdate(
            { _id: savedTweet._id },
            { threadId: childTweetsId }
          );
        }

        return [savedTweet, ...childTweets].map((doc) => doc.toObject());
      } catch (ex) {
        console.error(ex);
      }
    }
  }
};
