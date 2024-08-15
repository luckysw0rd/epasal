import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./Hooks/AuthContext";
import { useAuth } from "./Hooks/useAuth";
import { PrimeReactProvider } from 'primereact/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "./Hooks/useFetch";
import { useParams } from "react-router-dom";
import AdminDashboard from "./Components/AdminPanelBanau/Dashboard";
// import Dashboard from './Components/AdminPanel/Dashboard';
import Loading from "./Theme/Theme1/Loading/Loading";
import StoreNotFound from "./Components/NotFound/StoreNotFound";
const Dashboard = React.lazy(() => import('./Components/AdminPanel/Dashboard'));
// import Theme from "./Theme/Theme";
// Lazy loading components
const HomePage = React.lazy(() => import('./HomePage/HomePage'));
const Navbar = React.lazy(() => import('./HomePage/Navbar'));
const SignInPage = React.lazy(() => import('./Login/SignInPage'));
const Theme = React.lazy(() => import('./Theme/Theme'));
const GetUserLocation = React.lazy(() => import('./Components/Geolocaiton/GetUserLocation'));
// const Dashboard = React.lazy(() => import('./Components/AdminPanel/Dashboard'));
const GoogleOAuth = React.lazy(() => import('./Components/Google-OAuth/GoogleOAuth'));
const GoogleOAuthCustom = React.lazy(() => import('./Components/Google-OAuth/GoogleOAuthCustom'));
const ProductForm = React.lazy(() => import('./Theme/Theme1/SubProduct/ProductForm'));
const Home = React.lazy(() => import('./Components/AdminPanel/Dashboard/Home/Home'));
const EsewaRouteComponent = React.lazy(() => import('./Components/AdminPanel/Esewa/EsewaRouteComponent '));
const Allproducts = React.lazy(() => import('./Components/Allproducts/Allproducts'));
const SettingPage = React.lazy(() => import('./Components/SettingsPage/SettingPage'));
const PrivacyPolicy = React.lazy(() => import('./HomePage/PrivacyOverlay'));
const TermsAndConditions = React.lazy(() => import('./HomePage/TermsAndConditions'));
const ProjectLanding1 = React.lazy(() => import('./Components/ProductLanding/ProductLanding1'));

function App() {
  const { isLoading, error, sendRequest, onCloseError } = useFetch();

  const { token, login, logout, userID, setStore, hasOrder, setHasOrder } = useAuth();
  const userData = localStorage.getItem('userData');

  const auth = useContext(AuthContext);

  const RedirectToStore = () => {
    const { storeID } = useParams();
    return <Navigate to={`/store/${storeID}`} />;
  };

  localStorage.removeItem('store');
  localStorage.removeItem('product');

  let routes;
  if (token || auth.token || (userData && JSON.parse(userData)?.token)) {


    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />}></Route>
        <Route path="/adminpanelbanau" element={<AdminDashboard />} />
        <Route path="/store/:storeID" element={<Theme />} />
        <Route path="/:storeID" element={<RedirectToStore />} />
        <Route path="/mystore/storeNotFound" element={<StoreNotFound />} />
        <Route path="/location" element={<GetUserLocation />} />
        <Route path="/buildstore" element={<Theme />} />
        <Route path="/adminpanel/:storeName" element={<Dashboard />} />
        <Route path="/store/products/:storeName" element={<Allproducts />} />
        <Route path="/googleoauth" element={<GoogleOAuth />} />
        <Route path="/store/:storeID" element={<Theme />} />
        <Route path="/store/edit/:storeID" element={<Theme />} />
        <Route path="/googleoauthv1" element={<GoogleOAuthCustom />} />
        <Route path="/esewa/:field" element={<EsewaRouteComponent />} />
        <Route path="/adminhome" element={<Home />} />
        <Route path="/productlanding" element={<ProjectLanding1 />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/store/products/:storeName" element={<Allproducts />} />
        <Route path="*" element={<Navigate to="/" />} />
      </React.Fragment>
    );
  } else {

    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/buildstore" element={<Theme />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<SignInPage />}></Route>
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/mystore/storeNotFound" element={<StoreNotFound />} />
        <Route path="/:storeID" element={<RedirectToStore />} />
        <Route path="/store/:storeID" element={<Theme />} />
        <Route path="/store/products/:storeName" element={<Allproducts />} />
        <Route path="/esewa/:field" element={<EsewaRouteComponent />} />
        <Route path="/googleoauth" element={<GoogleOAuth />} />
        <Route path="/productlanding" element={<ProjectLanding1 />} />
        <Route path="/adminpanel/:storeName" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </React.Fragment>
    );
  }

  return (
    <PrimeReactProvider>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userID: userID, login: login, logout: logout, setStore: setStore, hasOrder: hasOrder, setHasOrder: setHasOrder }}>
        <div className="App">

          <Suspense fallback=
            {
              <Loading />
            }>
            <Router>

              <Routes>
                {routes}
              </Routes>
            </Router>

          </Suspense>
        </div >
        <ToastContainer />
      </AuthContext.Provider >
    </PrimeReactProvider >
  );
}

export default App;
