import { useState } from "react";

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
  cancelButton: boolean;
  callback: Function;
  field: Array<InputField>;
}

const PopupForm = (props: Props) => {
  let [inputData, setInputData] = useState(props.field);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let output = {};
    inputData.map((field) => {
      (output as any)[field.name.toLowerCase()] = field.input;
    });
    props.callback(output);
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

  return (
    <div className="fixed z-40 w-screen h-screen top-0 left-0 right-0 bottom-0 flex flex-wrap items-center justify-center bg-black bg-opacity-50">
      <form
        className="relative grid bg-white w-1/5 rounded-lg p-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-2xl font-bold pb-2">{props.title}</h1>
        <p className="text-sm leading-5 text-dark-gray">{props.desc}</p>
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
                value={field.input}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          );
        })}
        <button className="w-full bg-app-red px-8 py-1.5 mt-4 rounded-full font-medium text-white m-auto hover:brightness-75">
          {props.confirmButtonL}
        </button>
        {props.cancelButton && (
          <div
            className="w-full text-center bg-white border border-dark-gray px-8 py-1.5 mt-2 rounded-full font-medium text-dark-gray m-auto hover:bg-light-gray hover:cursor-pointer"
            onClick={(e) => props.callback()}
          >
            Cancel
          </div>
        )}
      </form>
    </div>
  );
};
export default PopupForm;
