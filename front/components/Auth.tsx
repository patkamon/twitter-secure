import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import PopupForm from "./PopupForm";
import PopupBio from "./PopupBio";

const Auth = () => {
  const router = useRouter();
  let [logInPopup, setLogInPopup] = useState(false);
  let [createAccPopup, setCreateAccPopup] = useState(false);
  let [createProfilePopup, setCreateProfilePopup] = useState(false);

  async function getUserProfile() {
    let user = JSON.parse(sessionStorage.getItem("user") || "{}");
    await axios
      .get("/api/user/profile", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setLogInPopup(false);
        (user as any)["profile"] = response.data.profile.pop();
        (user as any)["username"] = response.data.username;
        sessionStorage.setItem("user", JSON.stringify(user));
        router.reload();
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.message);
      });
  }

  async function handleCallbackLogIn(popupData: Array<Object>) {
    if (popupData) {
      await axios
        .post("/api/user/login", popupData)
        .then((response) => {
          setLogInPopup(false);
          sessionStorage.setItem("user", JSON.stringify(response.data));
          getUserProfile();
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    } else {
      setLogInPopup(false);
    }
  }

  async function handleCallbackCreateAcc(popupData: Array<Object>) {
    if (popupData) {
      await axios
        .post("/api/user/signup", popupData)
        .then((response) => {
          setCreateAccPopup(false);
          setCreateProfilePopup(true);
          sessionStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    } else {
      setCreateAccPopup(false);
    }
  }

  async function handleCallbackCreateProfile(popupData: Array<Object>) {
    let user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (popupData) {
      await axios
        .post("/api/user/profile", popupData, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setCreateProfilePopup(false);
          (user as any)["profile"] = response.data.profile.pop();
          (user as any)["username"] = response.data.username;
          sessionStorage.setItem("user", JSON.stringify(user));
          getUserProfile();
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    } else {
      setCreateProfilePopup(false);
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          className="w-fit bg-white py-1 px-4 rounded-full border border-app-red font-medium text-app-red m-auto hover:bg-light-gray"
          onClick={(e) => setCreateAccPopup(true)}
        >
          Sign up
        </button>
        <button
          className="w-fit bg-app-red py-1 px-4 rounded-full font-medium text-white m-auto hover:brightness-75"
          onClick={(e) => setLogInPopup(true)}
        >
          Log in
        </button>
      </div>
      {logInPopup && (
        <PopupForm
          title="Log in"
          desc=""
          confirmButtonL="Log in"
          cancelButton={true}
          field={[
            {
              name: "Email",
              type: "email",
              placeHolder: "email@tavitter.com",
              input: "",
            },
            {
              name: "Password",
              type: "password",
              placeHolder: "P@55word",
              input: "",
            },
          ]}
          callback={handleCallbackLogIn}
        />
      )}
      {createAccPopup && (
        <PopupForm
          title="Create your account"
          desc="Step 1 of 2"
          confirmButtonL="Next"
          cancelButton={true}
          field={[
            {
              name: "Username",
              type: "text",
              placeHolder: "MyTavitUsername",
              input: "",
            },
            {
              name: "Email",
              type: "email",
              placeHolder: "email@tavitter.com",
              input: "",
            },
            {
              name: "Password",
              type: "password",
              placeHolder: "P@55word",
              input: "",
            },
            {
              name: "Phone",
              type: "number",
              placeHolder: "0123456789",
              input: "",
            },
          ]}
          callback={handleCallbackCreateAcc}
        />
      )}
      {createProfilePopup && (
        <PopupBio
          title="Create profile"
          desc="Step 2 of 2"
          cancelButton={false}
          callback={handleCallbackCreateProfile}
        />
      )}
    </>
  );
};
export default Auth;
