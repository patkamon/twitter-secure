import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";
import axios from "axios";

import Navbar from "@/components/Navbar";
import TweetFeed from "@/components/TweetFeed";
import PostTweet from "@/components/PostTweet";
import UserProfile from "@/components/UserProfile";

interface Profile {
  name: string;
  desc: string;
  img: string;
  cover: string;
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
  const { data: session } = useSession();
  let [userProfile, setUserProfile] = useState<Profile>();
  let [tweets, setTweets] = useState<Array<TweetProps>>();

  useEffect(() => {
    async function getUserProfile() {
      await axios
        .get(`/api/user/profile/${router.query.userId}`)
        .then((response) => {
          let profile = response.data.profile.pop();
          if (profile) {
            delete profile.__v;
            delete profile._id;
            profile["username"] = response.data.username;
            profile["userId"] = response.data._id;
            setUserProfile(profile);
            if (session?.user.id == response.data._id) {
              getTweets();
            }
          } else {
            router.replace("/");
          }
        })
        .catch((error) => {
          console.log(error);
          if(window.sessionStorage.getItem("profile")) {
            setUserProfile(JSON.parse(window.sessionStorage.getItem("profile") || "{}"));
          } else {
            router.replace("/");
          }
        });
    }
    async function getTweets() {
      await axios
        .get("/api/tweet/", {
          headers: {
            Authorization: "Bearer " + session?.user.accessToken,
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
  }, [router.isReady, session]);

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
        {session && (
          <div className="pt-16">
            <PostTweet />
          </div>
        )}
      </div>
    </>
  );
};
export default UserPage;
