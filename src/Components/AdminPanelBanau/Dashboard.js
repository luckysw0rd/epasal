import React, { useEffect, useContext, useState } from "react";
import DashboardWrapper from "./DashboardWrapper";
import { SiderBarProvider } from "./SiderBarContext";
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Hooks/AuthContext";
import { useParams } from "react-router-dom";
import Home from "./Dashboard/Home/Home";
import Stores from "./Stores/Stores";
import Employee from "./Dashboard/Employee";

import TransactionLogs from "./TransactionLogs/TransactionLogs";

const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  const [dashboardState, setDashboardState] = useState('Home');
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [banau, setBanau] = useState(null); // Initialize store as null
  const { storeName } = useParams();
  const [role, setRole] = useState(null);

  console.log({ auth });


  const fetchbanau = async () => {
    try {
      const responseData = await sendRequest(
        'banau/getbanau',
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      console.log({ responseData }); // Handle response data as needed
      setBanau(responseData.banau);
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
  };




  useEffect(() => {
    fetchbanau();
  }, []);





  const renderDashboardContent = (store) => {
    switch (dashboardState) {
      case 'Home':
        return <Home />;
      case 'Stores':
        return <Stores />;
      case 'Logs':
        return <TransactionLogs />;
      case 'Employee':
        return <Employee banau={store} />;

      // if (role === 'Admin' || role === 'Owner') {
      //   console.log('Store:', store);
      //   return <Employee store={store} />;
      // } else {
      //   return <Home data={store} />;
      // }
      default:
        return <Home />;
    }
  };

  return (
    <>
      {auth?.token && (
        <div className=""> {/* Apply overflow styling here */}
          <SiderBarProvider className="overflow-hidden">
            <DashboardWrapper setDashboardState={setDashboardState} store={banau}>
              <div className="text-black p-2 py-4 mt-8 overflow-hidden">
                {renderDashboardContent(banau)}
              </div>
            </DashboardWrapper>
          </SiderBarProvider>
        </div >
      )}
    </>
  );
};

export default AdminDashboard;
