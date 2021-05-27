import mongoose, { Schema } from "mongoose";

export interface ITweet extends Document {
  description: string;
  userId: string;
  threadId?: [string];
}

const tweetSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
      maxLength: 284
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    threadId: [
      {
        type: Schema.Types.ObjectId,
        required: false
      }
    ]
  },
  { timestamps: true }
);

const Tweet = mongoose.model<ITweet>("Tweet", tweetSchema);

export default Tweet;
