import React, { useState } from "react";
import SideBar from "./SideBar";


import SharedNavbar from "./SharedNavbar";

const DashboardWrapper = ({ children, store, setDashboardState }) => {
  const [open, setOpen] = useState(true);

  console.log(store);
  return (
    <div className="flex relative overflow-hidden">
      {/* For Side bar */}
      {/* Conditionally render the SideBar */}
      {open && <SideBar setOpen={setOpen} setDashboardState={setDashboardState} />}
      {/* SideBar handler */}


      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <SharedNavbar storeLogo={store.logo.logoUrl} storeName={store.name} open={open} setOpen={setOpen} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
