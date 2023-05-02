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
  userProfile: Profile;
}

const UserProfile = (props: Props) => {
  return (
    <div className="relative border-b border-light-gray pb-4">
      <img
        className="aspect-[3/1] object-cover w-full"
        src={props.userProfile.cover}
      />
      <img
        className="relative aspect-[1/1] object-cover rounded-full w-40 -mt-20 mx-auto border-4 border-white"
        src={props.userProfile.img}
      />
      <p className="text-center text-3xl font-semibold">
        {props.userProfile.name}
      </p>
      <p className="text-center">
        <a
          href={"../user/" + props.userProfile.userId}
          className="text-xl text-dark-gray hover:text-app-red"
        >
          {"@" + props.userProfile.username}
        </a>
      </p>
      <p className="p-4">{props.userProfile.desc}</p>
    </div>
  );
};
export default UserProfile;
