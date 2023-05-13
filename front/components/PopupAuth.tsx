import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import Turnstile from "react-turnstile";

interface InputField {
  name: string;
  input: string;
  type: string;
  placeHolder: string;
}

interface Props {
  // children: React.ReactNode;
  title: string;
  desc: string;
  confirmButtonL: string;
  type: string;
  callback: Function;
  field: Array<InputField>;
}

const PopupAuth = (props: Props) => {
  let [inputData, setInputData] = useState(props.field);
  let [captcha, setCaptcha] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let output = {};
    inputData.map((field) => {
      (output as any)[field.name.toLowerCase()] = field.input;
    });
    if (captcha) {
      props.callback(output);
    } else {
      alert("Captcha verification failed, please try again");
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    setInputData(
      inputData.map((field) => {
        if (field.name === name) {
          field.input = value;
          return field;
        }
        return field;
      })
    );
  };

  async function handleCaptcha(token: string) {
    await axios
      .post("/api/captcha", { token: token })
      .then((response) => {
        if (response.data.success) {
          setCaptcha(true);
        } else {
          setCaptcha(false);
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data);
      });
  }

  return (
    <div className="fixed z-40 w-screen h-screen top-0 left-0 right-0 bottom-0 flex flex-wrap items-center justify-center bg-black bg-opacity-50">
      <form
        className="relative grid bg-white w-1/4 rounded-lg p-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-2xl font-bold pb-2">{props.title}</h1>
        <p className="text-sm leading-5 text-dark-gray max-h-80 overflow-y-auto">
          {props.desc}
        </p>
        {inputData.map((field) => {
          return (
            <div key={field.name + " div"} className="w-full py-2">
              <p key={field.name + " p"}>{field.name}</p>
              <input
                key={field.name + " input"}
                className="border-b w-full outline-none"
                id={field.name}
                placeholder={field.placeHolder}
                name={field.name}
                type={field.type}
                maxLength={45}
                min={0}
                value={field.input}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          );
        })}
        <Turnstile
          className="mx-auto my-5 max-w-[100%] overflow-x-auto bg-white"
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          theme="light"
          onVerify={(token) => handleCaptcha(token)}
        />
        <button
          type="button"
          onClick={(e) => signIn("github")}
          className="text-app-red"
        >
          Continue with Github
        </button>
        <button className="w-full bg-app-red px-8 py-1.5 mt-4 rounded-full font-medium text-white m-auto hover:brightness-75">
          {props.confirmButtonL}
        </button>
        <div
          className="w-full text-center bg-white border border-dark-gray px-8 py-1.5 mt-2 rounded-full font-medium text-dark-gray m-auto hover:bg-light-gray hover:cursor-pointer"
          onClick={(e) => props.callback()}
        >
          Cancel
        </div>
      </form>
    </div>
  );
};
export default PopupAuth;
