import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import Navbar from "@/components/Navbar";
import TweetFeed from "@/components/TweetFeed";
import PostTweet from "@/components/PostTweet";
import UserProfile from "@/components/UserProfile";

interface Profile {
  _id: string;
  name: string;
  desc: string;
  img: string;
  cover: string;
  __v: number;
  username: string;
  userId: string;
}

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

const UserPage = () => {
  const router = useRouter();
  let [userProfile, setUserProfile] = useState<Profile>();
  let [tweets, setTweets] = useState<Array<TweetProps>>();
  let [login, setLogin] = useState(false);

  useEffect(() => {
    async function getUserProfile() {
      let user = JSON.parse(sessionStorage.getItem("user") || "{}");
      await axios
        .get(`/api/user/profile/${router.query.userId}`)
        .then((response) => {
          let profile = response.data.profile.pop();
          profile["username"] = response.data.username;
          profile["userId"] = response.data._id;
          setUserProfile(profile);
          if (user.id == response.data._id) {
            getTweets();
          }
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response?.data.message);
        });
    }
    async function getTweets() {
      let user = JSON.parse(sessionStorage.getItem("user") || "{}");
      await axios
        .get("/api/tweet/", {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setTweets(response.data);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    }
    if (router.isReady) {
      getUserProfile();
    }
    if (sessionStorage.getItem("user") != null) {
      setLogin(true);
    }
  }, [router.isReady]);

  return (
    <>
      <Head>{userProfile && <title>{userProfile.name}</title>}</Head>
      <Navbar />
      <div className="grid grid-cols-4 h-screen">
        <div className="pt-16"></div>
        <div className="pt-12 bg-white col-span-2 border border-light-gray">
          {userProfile && (
            <div>
              <UserProfile userProfile={userProfile} />
            </div>
          )}
          {tweets?.map((tweet: TweetProps) => (
            <TweetFeed key={tweet._id} tweets={[tweet]} />
          ))}
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
export default UserPage;
