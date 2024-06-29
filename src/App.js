import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./Hooks/AuthContext";
import { useAuth } from "./Hooks/useAuth";
import { PrimeReactProvider } from 'primereact/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "./Hooks/useFetch";
import Loading from "./Theme/Theme1/Loading/Loading";

import AdminDashboard from "./Components/AdminPanelBanau/Dashboard";
import AdminHome from "./Components/AdminPanelBanau/Dashboard/Home/AdminHome";
import ProjectLanding1 from "./Components/ProductLanding/ProductLanding1";

// Lazy loading components
const HomePage = React.lazy(() => import('./HomePage/HomePage'));
const Navbar = React.lazy(() => import('./HomePage/Navbar'));
const SignInPage = React.lazy(() => import('./Login/SignInPage'));
const Theme = React.lazy(() => import('./Theme/Theme'));
const GetUserLocation = React.lazy(() => import('./Components/Geolocaiton/GetUserLocation'));
const Dashboard = React.lazy(() => import('./Components/AdminPanel/Dashboard'));
const GoogleOAuth = React.lazy(() => import('./Components/Google-OAuth/GoogleOAuth'));
const GoogleOAuthCustom = React.lazy(() => import('./Components/Google-OAuth/GoogleOAuthCustom'));
const ProductForm = React.lazy(() => import('./Theme/Theme1/SubProduct/ProductForm'));
const Home = React.lazy(() => import('./Components/AdminPanel/Dashboard/Home/Home'));
const EsewaRouteComponent = React.lazy(() => import('./Components/AdminPanel/Esewa/EsewaRouteComponent '));
const Allproducts = React.lazy(() => import('./Components/Allproducts/Allproducts'));
const SettingPage = React.lazy(() => import('./Components/SettingsPage/SettingPage'));

function App() {
  const { isLoading, error, sendRequest, onCloseError } = useFetch();

  const { token, login, logout, userID } = useAuth();
  const auth = useContext(AuthContext);
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/store/:storeID" element={<Theme />} />
        <Route path="/location" element={<GetUserLocation />} />
        <Route path="/buildstore" element={<Theme />} />
        <Route path="/store/products/:storeName" element={<Allproducts />} />
        <Route path="/adminpanel/:storeName" element={<Dashboard />} />
        <Route path="/adminpanelbanau" element={<AdminDashboard />} />
        <Route path="/googleoauth" element={<GoogleOAuth />} />
        <Route path="/store/:storeID" element={<Theme />} />
        <Route path="/store/edit/:storeID" element={<Theme />} />
        <Route path="/googleoauthv1" element={<GoogleOAuthCustom />} />
        <Route path="/esewa/:field" element={<EsewaRouteComponent />} />
        {/* Delete this route later */}
        <Route path="/adminhome" element={<Home />} />
        <Route path="/productlanding" element={<ProjectLanding1 />} />
        <Route path="/settings" element={<SettingPage />} />

      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />}></Route>
        {/* <Route path="/adminpanelbanau" element={<AdminDashboard />} /> */}
      </React.Fragment>
    );
  }

  return (
    <PrimeReactProvider>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userID: userID, login: login, logout: logout }}>
        <div className="App">
          <Router>
            <Suspense fallback=
            {
            <div className=" bg-fuchsia-700 h-screen w-screen">
              LOADING 
            </div>}>
              <Routes>
                {routes}
              </Routes>
            </Suspense>
          </Router>
        </div >
        <ToastContainer />
      </AuthContext.Provider >
    </PrimeReactProvider >
  );
}

export default App;
