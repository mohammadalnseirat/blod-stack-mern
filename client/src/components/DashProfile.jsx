import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const filePickerClick = useRef();
  // Add Some State to upload image:
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  console.log(imageFileUploadProgress, imageFileUploadError);
  // handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  // useEffect to track progress:
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // Function to upload image:
  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 6MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  return (
    <div className=" max-w-lg mx-auto w-full p-3 my-4">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Pro
        <span className="uppercase text-3xl text-cyan-500 italic dark:text-red-500">
          f
        </span>
        ile
      </h1>
      <form className="flex flex-col gap-5">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerClick}
        />
        <div
          onClick={() => filePickerClick.current.click()}
          className="w-32 relative  h-32 self-center cursor-pointer shadow-md overflow-y-hidden rounded-full"
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={6}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                },
                path: {
                  stroke: `rgba(62,152,199 / ${
                    imageFileUploadProgress / 100
                  } )`,
                },
              }}
            />
          )}
          <img
            className={`w-full absolute -top-[0.2%]  h-full border-[6px] object-cover border-gray-100 rounded-full ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            } `}
            src={imageFileUrl || currentUser.profilePhoto}
            alt="user profile"
          />
        </div>
        {imageFileUploadError && (
          <Alert
            color={"failure"}
            icon={AiOutlineCloseCircle}
            className="font-semibold"
          >
            {imageFileUploadError}
          </Alert>
        )}
        <TextInput
          placeholder="Enter username..."
          type="text"
          id="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          placeholder="Enter email..."
          type="email"
          id="email"
          defaultValue={currentUser.email}
        />
        <TextInput placeholder="password..." type="password" id="password" />
        <Button
          type="submit"
          gradientDuoTone={"greenToBlue"}
          outline
          className="text-xl uppercase font-[500]"
        >
          Update
        </Button>
      </form>
      <div className="flex items-center justify-between mt-5">
        <span className="cursor-pointer text-red-500 px-2 py-1 bg-gray-50 hover:bg-red-500 hover:text-white border-2 font-medium border-red-500 transition-all duration-150 rounded-md">
          Delete Account
        </span>
        <span className="cursor-pointer text-red-500 px-2 py-1 bg-gray-100 hover:bg-red-500 hover:text-white border-2 font-medium border-red-500 transition-all duration-150 rounded-md">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default DashProfile;
