import React from "react";
import SideBar from "./SideBar";


import SharedNavbar from "./SharedNavbar";

const DashboardWrapper = ({ children }) => {


  return (
    <div className="flex relative">
      {/* For Side bar */}
      <SideBar />
      {/* SideBar handler */}

      {/* Main Content */}
      <div className="flex-1 ">
        <SharedNavbar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
