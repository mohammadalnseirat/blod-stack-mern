import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-4xl cursor-pointer">
        Profile 
      </h1>
      <form className="flex flex-col gap-5">
        <div className="w-32 h-32 cursor-pointer self-center shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePhoto}
            alt="user"
            className="w-full h-full rounded-full object-cover border-8 border-gray-400"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Enter your username..."
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Enter your email..."
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Enter your password..."
        />
        <Button gradientDuoTone={"greenToBlue"} outline className="text-lg">
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="cursor-pointer text-red-500 px-2 py-1 border-2 font-[400] bg-gray-100 rounded-md border-red-500 hover:bg-red-500 hover:text-gray-100 transition-all duration-150 ">
          Delete Account
        </span>
        <span className="cursor-pointer text-red-500 px-2 py-1 border-2 font-[400] bg-gray-100 rounded-md border-red-500 hover:bg-red-500 hover:text-gray-100 transition-all duration-150 ">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default DashProfile;
