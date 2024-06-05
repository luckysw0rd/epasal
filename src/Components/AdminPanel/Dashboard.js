import React from "react";
import DashboardWrapper from "./DashboardWrapper";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <div className="flex text-sm md:text-[20px] lg:text-lg  flex-col lg:px-32 px-5 pt-0 lg:pt-0">
        <div className="my-1 py-5">
          This is Admin Panel Template 
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
