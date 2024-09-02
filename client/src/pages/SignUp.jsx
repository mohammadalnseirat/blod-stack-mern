import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side start here */}
        <div className="flex-1">
          <Link to={"/"} className="text-4xl font-bold dark:text-white ">
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-lg text-white">
              FreePen
            </span>
            Blog
          </Link>
          <p className="text-md mt-5 ">
            Free Pen is a blog offering tips and resources for freelance
            writers, You can sign up with your email and password or with
            Google.
          </p>
        </div>
        {/* left side end here */}
        {/* right side start here */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your UserName:" />
              <TextInput
                type="text"
                placeholder="Enter Your UserName..."
                id="username"
              />
            </div>
            <div>
              <Label value="Your Email:" />
              <TextInput
                type="email"
                placeholder="Enter Your Email..."
                id="email"
              />
            </div>
            <div>
              <Label value="Your Password:" />
              <TextInput
                type="password"
                placeholder="Enter Your Password..."
                id="password"
              />
            </div>
            <Button
              type="submit"
              className="uppercase"
              gradientDuoTone={"greenToBlue"}
            >
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <p className="font-[500]">
              -Already have an Account?{" "}
              <Link
                to={"/sign-in"}
                className="text-blue-500 font-semibold px-2 py-1 border border-gray-400 rounded-md hover:border-red-500 uppercase  hover:text-red-500 transition-all ease-in duration-100"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        {/* right side end here */}
      </div>
    </div>
  );
};

export default SignUp;
