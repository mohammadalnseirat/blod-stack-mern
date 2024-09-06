import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdOutlineRunningWithErrors } from "react-icons/md";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [formData, setFormData] = useState({});

  // handle Upload Image:
  const handleUploadImage = async () => {
    if (!file) {
      setImageFileUploadError("Please Select a image!");
      return;
    }
    try {
      setImageFileUploadError(null);
      // setImageFileUploadProgress(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Image upload failed!");
          setImageFileUploadProgress(0);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadError(null);
            setImageFileUploadProgress(0);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("something went wrong");
      setImageFileUploadProgress(0);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="my-7 font-semibold text-4xl text-gray-800 dark:text-gray-100 text-center">
        Creat a Post
      </h1>
      <form className="flex flex-col gap-4">
        {/* div for title and category start here */}
        <div className="flex flex-col gap-4  justify-between sm:flex-row">
          <TextInput
            type="text"
            id="title"
            placeholder="Enter Your Title..."
            required
            className="flex-1"
          />
          <Select className="font-semibold">
            <option className="font-semibold" value="uncategorized">Select a Category</option>
            <option className="font-semibold" value="javascript">JavaScript</option>
            <option className="font-semibold" value="reactjs">React Js</option>
            <option className="font-semibold" value="nodejs">Node Js</option>
            <option className="font-semibold" value="nextjs">Next Js</option>
            <option className="font-semibold" value="tailwindcss">Tailwind CSS</option>
          </Select>
        </div>
        {/* div for title and category enf=d here */}
        {/* div for image and input start here */}
        <div className="flex gap-4 justify-between items-center border-4 border-cyan-500 border-dashed p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone={"greenToBlue"}
            outline
            size={"sm"}
            onClick={handleUploadImage}
            disabled={!file || imageFileUploadProgress}
          >
            {imageFileUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert
            color={"failure"}
            className="font-semibold"
            icon={MdOutlineRunningWithErrors}
          >
            {imageFileUploadError}
          </Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            className="h-96 w-full object-cover"
            alt="upload-image"
          />
        )}
        {/* div for image and input end here */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button disabled={imageFileUploadProgress || !file} type="submit" gradientDuoTone={"redToYellow"}>
          Puplish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
