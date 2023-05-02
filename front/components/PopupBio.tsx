import { useEffect, useState } from "react";

interface Props {
  // children: React.ReactNode;
  title: string;
  desc: string;
  cancelButton: boolean;
  callback: Function;
}

const PopupBio = (props: Props) => {
  let [inputData, setInputData] = useState({
    img: "/profile_icon.jpg",
    cover: "/cover.png",
    desc: "",
    name: "",
  });

  useEffect(() => {
    let profile = JSON.parse(sessionStorage.getItem("user") || "{}").profile;
    if (profile) {
      setInputData({
        img: profile.img,
        cover: profile.cover,
        desc: profile.desc,
        name: profile.name,
      });
    }
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.callback(inputData);
  }

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
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
        setInputData((values) => ({ ...values, [name]: e.target?.result }));
      };
    }
  };

  return (
    <div className="fixed z-40 w-screen h-screen top-0 left-0 right-0 bottom-0 flex flex-wrap items-center justify-center bg-black bg-opacity-50">
      <form
        className="relative grid bg-white w-1/4 rounded-lg p-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-2xl font-bold pb-2">{props.title}</h1>
        <p className="text-sm leading-5 text-dark-gray">{props.desc}</p>
        <div className="w-full py-2">
          {inputData.cover && (
            <img
              className="aspect-[3/1] object-cover rounded-t-md"
              src={inputData.cover}
            />
          )}
          {inputData.img && (
            <img
              className="z-50 relative aspect-[1/1] object-cover rounded-full w-32 -mt-16 mx-auto border-4 border-white"
              src={inputData.img}
            />
          )}
          <input
            className="mt-4 border-b w-full outline-none"
            placeholder="Tavitter Name"
            name="name"
            type="text"
            maxLength={45}
            value={inputData.name}
            onChange={(e) => onChange(e)}
            required
          />
          <textarea
            className="mt-4 mb-2 border-b w-full outline-none resize-none"
            placeholder="Bio"
            name="desc"
            rows={5}
            maxLength={160}
            value={inputData.desc}
            onChange={(e) => onChange(e)}
          />
          <label
            htmlFor="cover"
            className="text-app-red border border-app-red rounded-full px-2 py-1 hover:cursor-pointer mr-2"
          >
            Add Cover
            <input
              className="w-full line-clamp-1 my-4 col-start-2 hidden"
              id="cover"
              name="cover"
              type="file"
              accept=".jpg, .jpeg, .png"
              required={inputData.cover ? false : true}
              onChange={(e) => onImageChange(e)}
            />
          </label>
          <label
            htmlFor="image"
            className="text-app-red border border-app-red rounded-full px-2 py-1 hover:cursor-pointer"
          >
            Add Image
            <input
              className="w-full line-clamp-1 my-4 col-start-2 hidden"
              id="image"
              name="img"
              type="file"
              accept=".jpg, .jpeg, .png"
              required={inputData.img ? false : true}
              onChange={(e) => onImageChange(e)}
            />
          </label>
        </div>
        <button className="w-full bg-app-red px-8 py-1.5 mt-4 rounded-full font-medium text-white m-auto hover:brightness-75">
          Save
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
export default PopupBio;
