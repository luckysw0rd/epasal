
import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import Navbar from "./HomePage/Navbar"
import SignInPage from "./Login/SignInPage";
import { AuthContext } from "./Hooks/AuthContext";
import { useAuth } from "./Hooks/useAuth";
import Theme from "./Theme/Theme";
import GetUserLocation from "./Components/Geolocaiton/GetUserLocation";
import Dashboard from "./Components/AdminPanel/Dashboard";
import GoogleOAuth from "./Components/Google-OAuth/GoogleOAuth";
import GoogleOAuthCustom from "./Components/Google-OAuth/GoogleOAuthCustom";
import { PrimeReactProvider } from 'primereact/api';
import ProductForm from "./Theme/Theme1/SubProduct/ProductForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
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
        <Route path="/adminpanel/:storeName" element={<Dashboard />} />
        <Route path="/googleoauth" element={<GoogleOAuth />} />
        <Route path="/productform" element={<ProductForm />} />

        <Route path="/googleoauthv1" element={<GoogleOAuthCustom />} />

      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />}></Route>

      </React.Fragment>
    );
  }

  return (
    <PrimeReactProvider>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userID: userID, login: login, logout: logout }}>
        <div className="App">
          <Router>
            <Routes>
              {routes}
            </Routes>
          </Router>
          <ToastContainer />
        </div>
      </AuthContext.Provider>
    </PrimeReactProvider>

  );
}

export default App;
