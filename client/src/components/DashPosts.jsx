import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TfiFaceSad } from "react-icons/tfi";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  // state to save the posts based on the user:
  const [userPosts, setUserPosts] = useState([]);
  // UseEffect to Fetch the data from the api:
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // create a response:
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        // convert the response to json:
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    // call the function when the user is Administrator:
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-400 dark:scrollbar-track-cyan-200 dark:scrollbar-thumb-cyan-400">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>post Title</Table.HeadCell>
            <Table.HeadCell>Post Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            <Table.Body className="divide-y" key={post._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-10 rounded p-[2px]  object-cover border border-gray-100 "
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium capitalize text-gray-900 dark:text-white"
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell className="font-semibold text-gray-800 dark:text-cyan-500 cursor-pointer text-center">
                  {post.category}
                </Table.Cell>
                <Table.Cell>
                  <span className="font-medium text-[16px] text-red-500  hover:underline hover:underline-offset-2 cursor-pointer">
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className="text-teal-500 hover:underline hover:underline-offset-2 text-[16px]"
                    to={`/update-post/${post._id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 mt-10 ">
          <h1 className="text-center text-3xl font-semibold capitalize italic text-gray-700 dark:text-gray-200 underline underline-offset-2 ">
            You have No Posts Yet!
          </h1>
          <TfiFaceSad className="text-6xl text-gray-700 dark:text-yellow-300" />
        </div>
      )}
    </div>
  );
};

export default DashPosts;
