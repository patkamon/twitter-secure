import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import Navbar from "@/components/Navbar";
import PostTweet from "@/components/PostTweet";
import Tweet from "@/components/Tweet";
import ReplyTweetFeed from "@/components/ReplyTweetFeed";

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

const TweetPage = () => {
  const router = useRouter();
  let [tweet, setTweets] = useState<Array<TweetProps>>();
  let [replyText, setReplyText] = useState("");
  let [login, setLogin] = useState(false);

  useEffect(() => {
    async function getAllTweet() {
      await axios
        .get(`/api/tweet/id/${router.query.tweetId}`)
        .then((response) => {
          if (response.data.length == 0) {
            router.replace("/");
          } else {
            setTweets(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    }
    if (router.isReady) {
      getAllTweet();
    }
    if (sessionStorage.getItem("user") != null) {
      setLogin(true);
    }
  }, [router.isReady]);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    let user = JSON.parse(sessionStorage.getItem("user") || "{}");
    await axios
      .put(
        `/api/tweet/comment/${router.query.tweetId}`,
        { msg: replyText },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((response) => {
        router.reload();
      })
      .catch((error) => {
        console.log(error);

        window.alert(error.response.data.message);
      });
  }

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setReplyText(event.target.value);
  };

  return (
    <>
      <Head>{router.isReady && <title>{router.query.userId}</title>}</Head>
      <Navbar />
      <div className="grid grid-cols-4 h-screen">
        <div className="pt-16"></div>
        <div className="pt-12 bg-white col-span-2 border border-light-gray">
          {tweet && <Tweet tweet={tweet[0]} />}
          {login && (
            <form
              onSubmit={handleSubmit}
              className="flex gap-4 border-b p-3 h-fit"
            >
              <img
                className="flex-none h-[48px] aspect-[1/1] object-cover rounded-full"
                src={
                  JSON.parse(sessionStorage.getItem("user") || "{}").profile.img
                }
              />
              <textarea
                className="flex-1 h-full w-full resize-none outline-none"
                id="replyTweet"
                placeholder="Taveet Your reply"
                rows={4}
                maxLength={280}
                value={replyText}
                onChange={onChange}
                required
              />
              <button className="flex-none bg-app-red px-6 py-1 rounded-full font-medium text-white m-auto hover:brightness-75">
                Reply
              </button>
            </form>
          )}
          {tweet && <ReplyTweetFeed replyTweets={tweet[0].comment} />}
        </div>
        {login && (
          <div className="pt-16">
            <PostTweet />
          </div>
        )}
      </div>
    </>
  );
};
export default TweetPage;
