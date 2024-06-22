import React, { useEffect, useContext, useState } from "react";
import DashboardWrapper from "./DashboardWrapper";
import { SiderBarProvider } from "./SiderBarContext";
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Hooks/AuthContext";
import { useParams } from "react-router-dom";
import Home from "./Dashboard/Home/Home";
import Stores from "./Stores/Stores";

const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  const [dashboardState, setDashboardState] = useState('Home');
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [store, setStore] = useState(null); // Initialize store as null
  const { storeName } = useParams();
  const [role, setRole] = useState(null);

  console.log({auth});


  useEffect(() => {
  }, []);





  const renderDashboardContent = (store) => {
    switch (dashboardState) {
      case 'Home':
        return <Home />;
      case 'Stores':
        return <Stores/>;
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
            <DashboardWrapper setDashboardState={setDashboardState} store={store}>
              <div className="text-black p-2 py-4 mt-8 overflow-hidden">
                {renderDashboardContent(store)}
              </div>
            </DashboardWrapper>
          </SiderBarProvider>
        </div >
      )}
    </>
  );
};

export default AdminDashboard;
