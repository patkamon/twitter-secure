import ReTweet from "./ReplyTweet";

interface ReplyTweet {
  _id: string;
  userId: string;
  msg: string;
  createdAt: string;
}

interface Props {
  replyTweets: Array<ReplyTweet>;
}

const ReplyTweetFeed = (props: Props) => {
  return (
    <>
      {props.replyTweets.map((replyTweet) => (
        <ReTweet key={replyTweet._id} replyTweet={replyTweet} />
      ))}
    </>
  );
};
export default ReplyTweetFeed;
