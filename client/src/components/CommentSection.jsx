import { Alert, Button, Spinner, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillSendFill } from "react-icons/bs";
import { BiSolidCommentError } from "react-icons/bi";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import CommentCom from "./CommentCom";

const CommentSection = ({ postId }) => {
  // get the current user:
  const { currentUser } = useSelector((state) => state.user);
  // state to save the comments:
  const [comment, setComment] = useState("");
  // state to show error and loading:
  const [commentError, setCommentError] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);
  // state to save the fetched comments:
  const [comments, setComments] = useState([]);

  // handle Submit Comment:
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError("Comment is too long. Maximum character limit is 200.");
      return;
    }
    try {
      setCommentLoading(true);
      setCommentError(null);
      // create response:
      const res = await fetch("/api/comment/createcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      // convert to json:
      const data = await res.json();
      if (!res.ok) {
        setCommentError(data.message);
        setCommentLoading(false);
        return;
      }
      if (res.ok) {
        setComment("");
        setCommentLoading(false);
        // // refresh comments:
        // window.location.reload()
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      console.log("Error creating comment ", error.message);
      setCommentError(error.message);
      setCommentLoading(false);
    }
  };

  // useEffect to show the user:
  useEffect(() => {
    const getComments = async () => {
      try {
        // create response:
        const res = await fetch(`/api/comment/getcommentsPost/${postId}`);
        // convert response to json:
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setComments(data);
        }
      } catch (error) {
        console.log("Error getting user ", error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center my-4 gap-[6px] text-gray-600 dark:text-gray-100 text-sm">
          <p className="font-semibold">- Signed In as:</p>
          <img
            src={currentUser.profilePhoto}
            alt={currentUser.username}
            className="w-5 h-5 object-cover rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            title="profile"
            className="  px-1  border border-cyan-600 hover:bg-cyan-600 hover:text-white   rounded-md transition-all duration-150"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 my-7 text-sm text-gray-500">
          <span className="underline underline-offset-2">
            - You Must be Sign In to continue to comment.
          </span>
          <Link
            to={"/sign-in"}
            className="cursor-pointer text-red-500 px-2 py-1 bg-gray-50 hover:bg-red-500 hover:text-white border-2 font-medium border-red-500 transition-all duration-150 rounded-md"
          >
            Sign In
          </Link>
        </div>
      )}
      {/* Comment Form */}
      {currentUser && (
        <form
          onSubmit={handleSubmitComment}
          className="border p-3 border-cyan-500 rounded-tl-lg rounded-br-lg"
        >
          <Textarea
            rows={3}
            placeholder="Write your comment..."
            maxLength={"200"}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-gray-600 font-semibold dark:text-gray-400">
              <span
                className={`border border-cyan-500 text-cyan-500 px-1 py-1 rounded-md ${
                  200 - comment.length === 0
                    ? "text-red-500 border border-red-500"
                    : ""
                }`}
              >
                {200 - comment.length}
              </span>{" "}
              Characters Remaining.
            </p>
            <Button
              // gradientDuoTone={"purpleToBlue"}
              type="submit"
              color="blue"
              size={"xs"}
              pill
              className="text-white"
              title="comment"
              disabled={commentLoading || comment.length === 0}
            >
              <BsFillSendFill className="text-[16px]" />
            </Button>
            {/* {commentLoading && (
              <div className="ml-2">
                <Spinner size="sm" />
              </div>
            )} */}
          </div>
          {commentError && (
            <Alert color={"failure"} icon={BiSolidCommentError}>
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {/*Show Comments */}
      {comments.length === 0 ? (
        <Alert
          color={"failure"}
          icon={BiSolidCommentError}
          className="my-5 font-semibold text-sm"
        >
          No comments found. Be the first to comment.
        </Alert>
      ) : (
        <>
          <div className="flex items-center gap-1 my-5 ">
            <p className="flex items-center font-semibold text-gray-500 dark:text-gray-300">
              <VscDebugBreakpointLog className="text-[15px] mt-[1px] text-cyan-600" />{" "}
              Comments:
            </p>
            <div className="border px-2 py-1  rounded-md border-gray-600 dark:border-cyan-600">
              {comments.length}
            </div>
          </div>
          {comments.map((comment) => (
            <CommentCom key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
