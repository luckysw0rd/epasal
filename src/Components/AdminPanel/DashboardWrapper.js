import React, { useState, useRef, useEffect } from "react";
import SideBar from "./SideBar";
import SharedNavbar from "./SharedNavbar";

const DashboardWrapper = ({ children, store, setDashboardState ,role,hasNotification,setHasNotification}) => {
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && sidebarRef.current && !sidebarRef.current.contains(event.target))
        setOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex relative overflow-hidden">
      {/* For Side bar */}
      {/* Conditionally render the SideBar */}
      {open && <SideBar setOpen={setOpen} setDashboardState={setDashboardState} role={role} hasNotification={hasNotification} setHasNotification={setHasNotification} PendingOrderToView={store?.pendingViewOrder} store={store}/>}
      {/* SideBar handler */}


      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div>
          <SharedNavbar storeLogo={store.logo.logoUrl} storeName={store.name} open={open} setOpen={setOpen} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
