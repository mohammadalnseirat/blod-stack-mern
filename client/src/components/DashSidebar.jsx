import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowCircleRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/userSlice/userSlice";
import {useDispatch} from 'react-redux'

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const dispatch = useDispatch()


  const handleDelete = async()=>{
    try {
      // create a resposne:
      const res = await fetch('/api/user/signout',{
        method: 'POST'
      })
      // convert data to json object:
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signOutSuccess())
      }
      
    } catch (error) {
      console.log("Error signing out user ", error.message)
      // dispatch error action here for UI feedback:
      // dispatch(signOutFailure(error.message)) // Uncomment when using Redux slice for error handling.  The error message will be displayed in the UI.  The action would be dispatched to the Redux store to update the state.  The UI would then show an error message.  Note: This is a placeholder and should be replaced with actual error handling logic.  This example assumes the error message is returned in the response data.  In a real-world application, you would need to handle the error response differently.  For example, you might want to retry the request, display a different error message, or handle it differently based on the status code of the response.  For more information on error handling in Redux, see the official Redux documentation: https://redux.js.org/usage/advanced/async-actions#error-handling-in-
      
    }
  }
  return (
    <Sidebar className="w-full md:w-56 border-r border-t-2 border-r-gray-300 dark:border-t-transparent dark:border-r-transparent">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
            as={'div'}
              icon={HiUser}
              label={"User"}
              labelColor={"dark"}
              active={tab === "profile"}
              className="cursor-pointer"
              
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item onClick={handleDelete} icon={HiArrowCircleRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
