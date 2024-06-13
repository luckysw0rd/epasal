import React, { useEffect, useContext, useState } from "react";
import DashboardWrapper from "./DashboardWrapper";
import { SiderBarProvider } from "./SiderBarContext";
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Hooks/AuthContext";
import Home from "./Dashboard/Home";
import Employee from "./Dashboard/Employee";
import { useParams } from "react-router-dom";
import EditStore from './EditStore/EditStore.js'

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [dashboardState, setDashboardState] = useState('Employee');
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [store, setStore] = useState(null); // Initialize store as null
  const { storeName } = useParams();
  const [role, setRole] = useState(null);



  const fetchStore = async () => {
    try {
      const responseData = await sendRequest(
        'store/getStore/' + storeName,
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


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userResponse = await sendRequest('users/getLoggedInUser', 'GET', null, {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        });
        const userRole = userResponse.user.roles[0].role;
        setRole(userRole);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [auth.token]);


  const renderDashboardContent = (store) => {
    switch (dashboardState) {
      case 'Home':
        return <Home />;
      case 'Employee':
<<<<<<< HEAD
        if (role === 'Admin' || role === 'Owner') {
          console.log('Store:', store);
          return <Employee store={store} />;
        } else {
          return <Home />;
        }
=======
        console.log(store)
        return <Employee store={store} />;
      case 'Edit Store':
        return <EditStore store={store}/>
>>>>>>> 803d17d898f596f8d61df0a493cea43b26c431c4
      default:
        return <Home />;
    }
  };

  return (
    <>
      {store && (
        <div className=""> {/* Apply overflow styling here */}
          <SiderBarProvider className="overflow-hidden">
            <DashboardWrapper setDashboardState={setDashboardState} store={store}>
              <div className="text-black p-2 py-4 mt-8 overflow-hidden">
                {renderDashboardContent(store)}
              </div>
            </DashboardWrapper>
          </SiderBarProvider>
        </div>
      )}
    </>
  );
};

export default Dashboard;
