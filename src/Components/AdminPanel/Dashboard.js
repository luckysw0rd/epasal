import React, { useEffect, useContext, useState } from "react";
import DashboardWrapper from "./DashboardWrapper";
import { SiderBarProvider } from "./SiderBarContext";
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Hooks/AuthContext";
import Home from "./Dashboard/Home";
import Employee from "./Dashboard/Employee";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [dashboardState, setDashboardState] = useState('Employee');
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [store, setStore] = useState(null); // Initialize store as null
  const { storeName } = useParams();
  const fetchStore = async () => {
    try {
      const responseData = await sendRequest(
        'store/getStore/'+storeName,
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      console.log(responseData); // Handle response data as needed
      setStore(responseData.store);
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const renderDashboardContent = (Store) => {
    switch (dashboardState) {
      case 'Home':
        return <Home />;
      case 'Employee' /* && ('user.role==='admin' ||'user.role==='owner') */:
        console.log(store)
        return <Employee store={store} />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      {store && (
        <div className=""> {/* Apply overflow styling here */}
          <SiderBarProvider className="overflow-hidden">
            <DashboardWrapper store={store}>
              <div className="text-black p-2 py-4 mt-8 overflow-hidden">
                {renderDashboardContent(store)}
              </div>
            </DashboardWrapper>
          </SiderBarProvider>
        </div>
      )}
    </>
  );
}

export default Dashboard;
