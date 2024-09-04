import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowCircleRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

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
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              icon={HiUser}
              label={"User"}
              labelColor={"dark"}
              active={tab === "profile"}
              className="cursor-pointer"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowCircleRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
