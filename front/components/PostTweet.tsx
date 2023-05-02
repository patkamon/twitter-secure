import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

type Profile = {
  _id: string;
  name: string;
  desc: string;
  img: string;
  cover: string;
  __v: number;
};

type User = {
  id: string;
  profile?: Profile;
  token: string;
  username?: string;
};

const PostTweet = () => {
  const router = useRouter();
  let [user, setUser] = useState<User>();
  let [inputData, setInputData] = useState({
    msg: "",
    photo: [],
    video: [],
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") != null) {
      setUser(JSON.parse(window.sessionStorage.getItem("user") || "{}"));
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await axios
      .post("/api/tweet", inputData, {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      })
      .then((response) => {
        router.reload();
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.message);
      });
  }

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const files = event.target.files;
    const reader = new FileReader();

    if (files && files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        setInputData((values) => ({ ...values, [name]: [e.target?.result] }));
      };
    }
  };

  return (
    <>
      {user && (
        <div className="fixed w-[23%] bg-white drop-shadow-xl rounded-xl mx-5 hidden xl:grid max-h-[90%] overflow-auto">
          <div className="m-4 grid grid-cols-1">
            <img
              className="row-span-2 col-end-1 row-end-1 w-[48px] aspect-[1/1] object-cover rounded-full"
              src={user.profile?.img}
            />
            <p className="pl-4 my-auto text-xl">{user.profile?.name}</p>
            <a
              href={"../user/" + user.id}
              className="pl-4 my-auto text-sm text-dark-gray hover:text-app-red"
            >
              {"@" + user.username}
            </a>
          </div>
          <form onSubmit={handleSubmit} className="row-span-4">
            <textarea
              className="outline-none w-full resize-none px-4"
              name="msg"
              placeholder="What's happening?"
              rows={10}
              maxLength={280}
              value={inputData.msg}
              onChange={onChange}
            />
            <div className="grid border-t border-light-gray mx-4 py-4 gap-2">
              {inputData.photo.map((photo, id) => {
                return (
                  <img
                    key={id}
                    className="object-cover rounded-md w-full m-auto hover:cursor-pointer"
                    onClick={(e) =>
                      setInputData((values) => ({ ...values, photo: [] }))
                    }
                    src={photo}
                  />
                );
              })}
              {inputData.video.map((video, id) => {
                return (
                  <video
                    loop
                    key={id}
                    className="object-cover rounded-md w-full m-auto hover:cursor-pointer border-4 border-double border-app-red"
                    onClick={(e) =>
                      setInputData((values) => ({ ...values, video: [] }))
                    }
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                );
              })}
              <div className="col-span-2">
                <label
                  htmlFor="photo"
                  className="my-4 hover:cursor-pointer text-app-red mr-2"
                >
                  +Photo
                  <input
                    className="hidden"
                    id="photo"
                    name="photo"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => onImageChange(e)}
                  />
                </label>
                <label
                  htmlFor="video"
                  className="my-4 hover:cursor-pointer text-app-red"
                >
                  +Video
                  <input
                    className="w-full line-clamp-1 my-4 col-start-2 hidden"
                    id="video"
                    name="video"
                    type="file"
                    accept="video/*"
                    onChange={(e) => onImageChange(e)}
                  />
                </label>
              </div>
              <button className="col-span-2 max-w-fit bg-app-red px-8 py-1.5 m-auto rounded-full font-medium text-white hover:brightness-75">
                Taveet
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PostTweet;
