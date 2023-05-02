import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import PopupForm from "./PopupForm";
import Auth from "./Auth";
import PopupBio from "./PopupBio";

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

const Navbar = () => {
  const router = useRouter();
  let [user, setUser] = useState<User>();
  let [selectNav, setSelectNav] = useState(false);
  let [logoutPopup, setLogoutPopup] = useState(false);
  let [editPopup, setEditPopup] = useState(false);
  let [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("user") != null) {
      setUser(JSON.parse(window.sessionStorage.getItem("user") || "{}"));
    }
  }, []);

  async function getUserProfile() {
    await axios
      .get("/api/user/profile", {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      })
      .then((response) => {
        (user as any)["profile"] = response.data.profile.pop();
        (user as any)["username"] = response.data.username;
        sessionStorage.setItem("user", JSON.stringify(user));
        router.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCallbackLogoutPopup(popupData: Array<Object>) {
    setLogoutPopup(false);
    setSelectNav(false);
    if (popupData) {
      sessionStorage.clear();
      router.reload();
    }
  }

  async function handleCallbackEditPopup(popupData: Array<Object>) {
    if (popupData) {
      await axios
        .post("/api/user/profile", popupData, {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        })
        .then((response) => {
          setEditPopup(false);
          setSelectNav(false);
          getUserProfile();
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    } else {
      setEditPopup(false);
      setSelectNav(false);
    }
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    alert(searchText);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  function handleSelect(type: string, event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (type == "profile") {
      router.push(`/user/${user?.id}`);
    } else if (type == "logout") {
      setLogoutPopup(true);
    } else if (type == "edit") {
      setEditPopup(true);
    }
  }

  return (
    <>
      <div className="z-20 fixed top-0 w-full bg-white drop-shadow px-5 p-2 grid grid-flow-col place-content-between">
        <a href={"/"} className="text-2xl font-semibold hover:cursor-pointer">
          Tavitter
        </a>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full col-span-2">
          {/* <input
            className="focus:text-black outline-none bg-light-gray text-dark-gray text-sm rounded-full block w-full h-8 px-5 p-2.5"
            id="search"
            type="text"
            placeholder="Search Tavitter"
            value={searchText}
            onChange={onChange}
            required
          /> */}
        </form>
        {user ? (
          <>
            <button
              onClick={(e) => setSelectNav(!selectNav)}
              className="text-l font-semibold bg-white text-app-red m-auto border py-1 px-2 rounded-md hover:bg-light-gray"
            >
              {user?.profile ? user.profile.name : "Create Profile"}
            </button>
            {selectNav && (
              <div className="fixed grid w-1/12 top-12 right-5 bg-white rounded shadow-lg">
                <button
                  onClick={(e) => handleSelect("profile", e)}
                  className="hover:bg-light-gray p-1 border-b text-left"
                >
                  Profile
                </button>
                <button
                  onClick={(e) => handleSelect("edit", e)}
                  className="hover:bg-light-gray p-1 border-b text-left"
                >
                  Edit Profile
                </button>
                <button
                  onClick={(e) => handleSelect("logout", e)}
                  className="hover:bg-light-gray p-1 font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Auth />
        )}
      </div>
      {logoutPopup && (
        <PopupForm
          title="Log out of Tavitter?"
          desc="You can always log back in at any time."
          confirmButtonL="Log out"
          cancelButton={true}
          field={[]}
          callback={handleCallbackLogoutPopup}
        />
      )}
      {editPopup && (
        <PopupBio
          title="Edit profile"
          desc=""
          cancelButton={true}
          callback={handleCallbackEditPopup}
        />
      )}
    </>
  );
};
export default Navbar;
