import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

import Navbar from "@/components/Navbar";
import PostTweet from "@/components/PostTweet";
import TweetFeed from "@/components/TweetFeed";

const Home = () => {
  let [tweets, setTweets] = useState([]);
  useEffect(() => {
    // console.log(JSON.parse(sessionStorage.getItem("user") || "{}"));
    getAllTweet();
  }, []);

  async function getAllTweet() {
    await axios
      .get("/api/tweet/all")
      .then((response) => {
        setTweets(response.data);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.message);
      });
  }

  return (
    <>
      <Head>
        <title>Home / Tavitter</title>
      </Head>
      <Navbar />
      <div className="grid grid-cols-4 h-screen">
        <div className="pt-16"></div>
        <div className="pt-16 bg-white col-span-2 border border-light-gray">
          <p className="text-xl font-semibold border-b w-full p-3">Home</p>
          <TweetFeed tweets={tweets} />
        </div>
        <div className="pt-16">
          <PostTweet />
        </div>
      </div>
    </>
  );
};
export default Home;
