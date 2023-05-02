import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import PopupForm from "./PopupForm";

interface Profile {
  _id: string;
  name: string;
  desc: string;
  img: string;
  cover: string;
  __v: number;
}

interface User {
  id: string;
  profile?: Profile;
  token: string;
  username?: string;
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

interface TweetProfile extends Profile {
  _id: string;
  name: string;
  desc: string;
  img: string;
  cover: string;
  __v: number;
  username: string;
  userId: string;
}

interface Props {
  tweet: TweetProps;
}

const Tweet = (props: Props) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [playVideo, setPlayVideo] = useState(false);
  let [userProfile, setUserProfile] = useState<TweetProfile>();
  let [user, setUser] = useState<User>();
  let [owner, setOwner] = useState(false);
  let [liked, setLiked] = useState({
    status: false,
    count: props.tweet.like_count,
  });
  let [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    async function getUserProfile() {
      await axios
        .get(`/api/user/profile/${props.tweet.userId}`)
        .then((response) => {
          let profile = response.data.profile.pop();
          profile["username"] = response.data.username;
          profile["userId"] = response.data._id;
          setUserProfile(profile);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getUserProfile();
    if (sessionStorage.getItem("user") != null) {
      let user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
      setUser(user);
      if (props.tweet.userId == user?.id) {
        setOwner(true);
      }
      if (user && props.tweet.like.includes(user.id)) {
        setLiked((values) => ({ ...values, status: true }));
      }
    }
  }, []);

  function formatDate() {
    let d = new Date(props.tweet.createdAt).toString().split(" ");
    return [d[1] + " " + d[2] + ", " + d[3]];
  }

  function handlePlayVideo(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setPlayVideo(!playVideo);
    if (playVideo) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }

  function handleSelect(type: string, event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (type == "user") {
      router.push(`/user/${userProfile?.userId}`);
    } else if (type == "like") {
      handleLikeTweet();
    } else if (type == "retweet") {
      alert("retaveet");
    } else if (type == "delete") {
      setDeletePopup(true);
    }
  }

  async function handleCallbackDeletePopup(popupData: Array<Object>) {
    setDeletePopup(false);
    if (popupData) {
      await axios
        .delete(`/api/tweet/${props.tweet._id}`, {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        })
        .then((response) => {
          router.replace(
            "/user/" + JSON.parse(sessionStorage.getItem("user") || "{}").id
          );
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    }
  }

  async function handleLikeTweet() {
    await axios
      .put(`/api/tweet/like/${props.tweet._id}`, null, {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      })
      .then((response) => {
        setLiked({
          status: !liked.status,
          count: response.data.like_count,
        });
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.message);
      });
  }

  return (
    <>
      {userProfile && (
        <div
          className="relative place-content-start grid grid-flow-col gap-x-4 border-b p-3 hover:cursor-pointer hover:bg-light-gray"
          onClick={() => {
            router.push(`/tweet/${props.tweet._id}`);
          }}
        >
          {/* {this.props.tweet.reTweet && (
            <p className="col-start-1 flex text-sm text-dark-gray">
              {this.props.tweet.reTweet + " Retweeted"}
            </p>
          )} */}
          <img
            className="row-start-2 row-span-5 col-end-1 w-[48px] aspect-[1/1] object-cover rounded-full justify-self-end"
            src={userProfile?.img}
          />
          <div className="row-start-2 flex items-center">
            <p className="mr-2 font-semibold">{userProfile?.name}</p>
            <div
              className="mr-2 text-dark-gray hover:text-app-red"
              onClick={(e) => handleSelect("user", e)}
            >
              {"@" + userProfile?.username}
            </div>
            <p className="text-dark-gray">{"· " + formatDate()}</p>
          </div>
          <p>{props.tweet.msg}</p>
          <div className="relative">
            {props.tweet.video.map((video) => {
              return (
                <div key={"videoDiv"}>
                  {!playVideo && (
                    <div
                      key={"playButton"}
                      className="absolute left-[45%] top-[45%] bg-white rounded-full py-3 px-2 border-4 border-app-red font-bold text-app-red"
                    >
                      Play
                    </div>
                  )}
                  <video
                    loop
                    key={0}
                    ref={videoRef}
                    onClick={(e) => handlePlayVideo(e)}
                    className="object-contain rounded-md w-full max-h-[800px] m-auto my-1"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
              );
            })}
          </div>
          {props.tweet.photo.map((photo) => {
            return (
              <img
                key={0}
                className="object-contain rounded-md w-full max-h-[800px] m-auto my-1"
                src={photo}
              />
            );
          })}
          <div className="flex text-dark-gray pt-1">
            {user && <div className="mr-5 hover:text-app-red">Reply</div>}
            {/* <div
            className="mr-5 hover:text-app-red"
            onClick={(e) => handleSelect("retweet", e)}
          >
            Retaveet
          </div> */}
            {user ? (
              <div
                className={
                  liked.status
                    ? "text-app-red hover:text-dark-gray"
                    : "hover:text-app-red"
                }
                onClick={(e) => handleSelect("like", e)}
              >
                {liked.count} Like
              </div>
            ) : (
              <div>{liked.count} Like</div>
            )}
            {owner && (
              <div
                className="hover:text-app-red absolute top-3 right-3"
                onClick={(e) => handleSelect("delete", e)}
              >
                Delete
              </div>
            )}
          </div>
        </div>
      )}
      {deletePopup && (
        <PopupForm
          title="Delete Taveet?"
          desc="This can't be undone and it will be removed from your profile."
          confirmButtonL="Delete"
          cancelButton={true}
          field={[]}
          callback={handleCallbackDeletePopup}
        />
      )}
    </>
  );
};
export default Tweet;
