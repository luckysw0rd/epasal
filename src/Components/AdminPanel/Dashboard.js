import React from "react";
import DashboardWrapper from "./DashboardWrapper";
import { SiderBarProvider } from "./SiderBarContext";

const Dashboard = () => {
  return (
    <SiderBarProvider>
      <DashboardWrapper>
        <div className="flex text-sm md:text-[20px] lg:text-lg  flex-col lg:px-32 px-5 pt-0 lg:pt-0">
          <div className="my-1 py-5">
          </div>
          
          <div className="my-1 py-5">
            <h2 className="text-xl font-bold">This Is Your Dashboard Modify According To Your Need</h2> 
          </div>
        </div>
      </DashboardWrapper>
    </SiderBarProvider>
  );
};

export default Dashboard;
