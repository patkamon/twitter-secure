import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import PopupForm from "./PopupForm";

interface ReplyTweet {
  _id: string;
  userId: string;
  msg: string;
  createdAt: string;
}

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

interface Props {
  replyTweet: ReplyTweet;
}

const ReTweet = (props: Props) => {
  const router = useRouter();
  let [userProfile, setUserProfile] = useState<Profile>();
  let [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    async function getUserProfile() {
      await axios
        .get(`/api/user/profile/${props.replyTweet.userId}`)
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
  }, []);

  function formatDate() {
    let d = new Date(props.replyTweet.createdAt).toString().split(" ");
    return [d[1] + " " + d[2] + ", " + d[3]];
  }

  function handleSelect(type: string, event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (type == "user") {
      router.push(`/user/${userProfile?.userId}`);
    } else if (type == "like") {
      alert("liked");
    } else if (type == "retweet") {
      alert("retaveet");
    } else if (type == "delete") {
      setDeletePopup(true);
    }
  }

  function handleCallbackDeletePopup(popupData: Array<Object>) {
    setDeletePopup(false);
  }

  return (
    <>
      <div className="relative place-content-start grid grid-flow-col gap-x-4 border-b p-3">
        <img
          className="row-start-2 row-span-2 col-end-1 w-[48px] aspect-[1/1] object-cover rounded-full justify-self-end"
          src={userProfile?.img}
        />
        <div className="row-start-2 flex items-center">
          <p className="mr-2 font-semibold">{userProfile?.name}</p>
          <div
            className="mr-2 text-dark-gray hover:cursor-pointer hover:text-app-red"
            onClick={(e) => handleSelect("user", e)}
          >
            {"@" + userProfile?.username}
          </div>
          <p className="text-dark-gray">{"· " + formatDate()}</p>
        </div>
        <p>{props.replyTweet.msg}</p>
      </div>
      {deletePopup && (
        <PopupForm
          title="Delete Taveet?"
          desc="This can't be undone and it will be removed from your profile and any accounts that have followed you."
          confirmButtonL="Delete"
          cancelButton={true}
          field={[]}
          callback={handleCallbackDeletePopup}
        />
      )}
    </>
  );
};
export default ReTweet;
