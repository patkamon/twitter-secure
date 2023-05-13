import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";

import PopupForm from "./PopupForm";
import Auth from "./Auth";
import PopupBio from "./PopupBio";

interface Profile {
  name: string;
  desc: string;
  img: string;
  cover: string;
  username: string;
}

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  let [profile, setProfile] = useState<Profile>();
  let [selectNav, setSelectNav] = useState(false);
  let [logoutPopup, setLogoutPopup] = useState(false);
  let [editPopup, setEditPopup] = useState(false);
  let [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("profile")) {
      if (session) {
        setProfile(JSON.parse(window.sessionStorage.getItem("profile") || "{}"))
      } else if (session === null) {
        sessionStorage.clear()
      }
    } else if (session) {
      getUserProfile();
    }
  }, [session]);

  async function getUserProfile() {
    if (session?.user.image && session?.user.name) {
      const profile = {
        name: session.user.name,
        desc: "",
        img: session.user.image,
        cover: "/cover.png",
        username: session.user.name!.replace(/\s+/g, ""),
      };
      setProfile(profile);
      sessionStorage.setItem("profile", JSON.stringify(profile));
    } else {
      await axios
        .get("/api/user/profile", {
          headers: {
            Authorization: ("Bearer " + session?.user.accessToken) as string,
          },
        })
        .then((response) => {
          let profile = response.data.profile.pop();
          if (profile) {
            delete profile.__v;
            delete profile._id;
            (profile as any)["username"] = response.data.username;
            sessionStorage.setItem("profile", JSON.stringify(profile));
            setProfile(profile);
          } else {
            setEditPopup(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleCallbackLogoutPopup(popupData: Object) {
    setLogoutPopup(false);
    setSelectNav(false);
    if (popupData) {
      sessionStorage.clear();
      signOut();
      router.replace("/").then(() => router.reload());
    }
  }

  async function handleCallbackEditPopup(popupData: Object) {
    if (popupData) {
      await axios
        .post("/api/user/profile", popupData, {
          headers: {
            Authorization: "Bearer " + session?.user.accessToken,
          },
        })
        .then((response) => {
          setEditPopup(false);
          setSelectNav(false);
          sessionStorage.clear();
          router
            .replace("/user/" + session?.user.id)
            .then(() => router.reload());
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
      router.push(`/user/${session?.user.id}`);
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
        {session ? (
          <>
            <button
              onClick={(e) => setSelectNav(!selectNav)}
              className="text-l font-semibold bg-white text-app-red m-auto border py-1 px-2 rounded-md hover:bg-light-gray"
            >
              {profile?.name ? profile.name : "Create Profile"}
            </button>
            {selectNav && (
              <div className="fixed grid w-1/12 top-12 right-5 bg-white rounded shadow-lg">
                {profile && (
                  <button
                    onClick={(e) => handleSelect("profile", e)}
                    className="hover:bg-light-gray p-1 border-b text-left"
                  >
                    Profile
                  </button>
                )}
                <button
                  onClick={(e) => handleSelect("edit", e)}
                  className="hover:bg-light-gray p-1 border-b text-left"
                >
                  {profile ? "Edit Profile" : "Create Profile"}
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
          hyperlink=""
          cancelButton={true}
          field={[]}
          callback={handleCallbackLogoutPopup}
        />
      )}
      {editPopup && (
        <PopupBio
          title={profile ? "Edit Profile" : "Create Profile"}
          desc={profile ? "" : "Step 2 of 2"}
          cancelButton={profile ? true : false}
          callback={handleCallbackEditPopup}
        />
      )}
    </>
  );
};
export default Navbar;
