import React, { useEffect } from "react";
import SideBar from "./SideBar";

import { HiMenuAlt3 } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import SharedNavbar from "./SharedNavbar";
import { useNavigate } from "react-router-dom";

const DashboardWrapper = ({ children }) => {


  return (
    <div className="flex relative">
      {/* For Side bar */}
      <SideBar />
      {/* SideBar handler */}

      {/* Main Content */}
      <div className="flex-1 border">
        <SharedNavbar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
