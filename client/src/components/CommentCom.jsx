import React, { useEffect, useState } from "react";
import moment from "moment";

const CommentCom = ({ comment }) => {
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
      </div>
    </div>
  );
};

export default CommentCom;
