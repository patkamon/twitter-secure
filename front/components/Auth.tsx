import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import PopupForm from "./PopupForm";
import PopupAuth from "./PopupAuth";

interface inputCreateAcc {
  username: string;
  email: string;
  password: string;
  confirm?: string;
  phone: string;
}

const Auth = () => {
  const router = useRouter();
  let [logInPopup, setLogInPopup] = useState(false);
  let [createAccPopup, setCreateAccPopup] = useState(false);
  let [createConsent, setCreateConsent] = useState(false);

  async function handleCallbackLogIn(popupData: Object) {
    if (popupData) {
      signIn("tavitter-login", { ...popupData, redirect: false }).then(
        ({ ok, error }) => {
          if (ok) {
            setLogInPopup(false);
            router.reload();
          } else {
            console.log(error);
            alert(error.message);
          }
        }
      );
    } else {
      setLogInPopup(false);
    }
  }

  async function handleCallbackCreateAcc(popupData: inputCreateAcc) {
    if (popupData) {
      if (popupData.password != popupData.confirm) {
        alert("Password do not match");
      } else {
        delete popupData.confirm;
        signIn("tavitter-signup", { ...popupData, redirect: false }).then(
          ({ ok, error }) => {
            if (ok) {
              setCreateAccPopup(false);
              router.reload();
            } else {
              console.log(error);
              alert(error.message);
            }
          }
        );
      }
    } else {
      setCreateAccPopup(false);
    }
  }

  function handleCallbackCreateCon(popupData: Object) {
    if (popupData) {
      setCreateAccPopup(true);
    }
    setCreateConsent(false);
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          className="w-fit bg-white py-1 px-4 rounded-full border border-app-red font-medium text-app-red m-auto hover:bg-light-gray"
          onClick={(e) => setCreateConsent(true)}
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
        <PopupAuth
          title="Log in"
          desc=""
          confirmButtonL="Log in"
          type="login"
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
      {createConsent && (
        <PopupForm
          title="Consent Form"
          desc="By accepting the Terms and Conditions of this service, you confirm that you have read and understood our Privacy Notification. You also confirm that you are 20 years old or older."
          confirmButtonL="Accept"
          hyperlink="/term"
          cancelButton={true}
          field={[]}
          callback={handleCallbackCreateCon}
        />
      )}
      {createAccPopup && (
        <PopupAuth
          title="Create your account"
          desc="Step 1 of 2"
          confirmButtonL="Next"
          type="signup"
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
              name: "Confirm",
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
    </>
  );
};
export default Auth;
