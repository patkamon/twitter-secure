import Tweet from "./Tweet";

interface ReplyTweet {
  _id: string;
  userId: string;
  msg: string;
  createdAt: string;
}

interface TweetProps {
  _id: string;
  userId: string;
  msg: string;
  comment: Array<ReplyTweet>;
  photo: Array<string>;
  video: Array<string>;
  like: Array<string>;
  like_count: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  userId?: string | string[];
  tweets: Array<TweetProps>;
}

const TweetFeed = (props: Props) => {
  return (
    <>
      {props.tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)}
    </>
  );
};
export default TweetFeed;
