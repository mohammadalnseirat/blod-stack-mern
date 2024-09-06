import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, FileInput, Select, TextInput } from "flowbite-react";

const CreatePost = () => {
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
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React Js</option>
            <option value="nodejs">Node Js</option>
            <option value="nextjs">Next Js</option>
            <option value="tailwindcss">Tailwind CSS</option>
          </Select>
        </div>
        {/* div for title and category enf=d here */}
        {/* div for image and input start here */}
        <div className="flex gap-4 justify-between items-center border-4 border-cyan-500 border-dashed p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone={"greenToBlue"}
            outline
            size={"sm"}
          >
            Upload Image
          </Button>
        </div>
        {/* div for image and input end here */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone={"redToYellow"}>
          Puplish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
