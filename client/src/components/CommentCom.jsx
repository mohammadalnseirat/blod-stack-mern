import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";

const CommentCom = ({ comment, onLike }) => {
  // get the currentUser:
  const { currentUser } = useSelector((state) => state.user);
  // state to save the user's comment
  const [user, setUser] = useState({});
  // useEffect to get the user:
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  // console.log(user);
  // console.log(comment);
  return (
    <div className="p-4 flex border-b rounded-xl border-b-gray-400 dark:border-b-cyan-500">
      {/* div for image start here */}
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePhoto}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-500"
        />
      </div>
      {/* div for image end here */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold mr-1 text-sm truncate dark:text-cyan-500">
            {user ? `@${user.username}` : "Anonymous user"}
          </span>
          <span className="text-gray-400 text-xs border-b border-b-gray-400 rounded-full">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p>{comment.content}</p>
        <div className="flex mt-2 items-center pt-[6px] text-xs border-t border-t-gray-500 dark:border-cyan-500  max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-500  hover:text-blue-500 text-[20px] ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-600"
            }`}
          >
            <FaThumbsUp />
          </button>
          <p className="text-sm font-semibold dark:text-cyan-500">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "Like" : "Likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCom;
