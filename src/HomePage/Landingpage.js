import React from 'react';
import { Link } from 'react-router-dom';
import bannar from "../Assets/Group 117.png";
import storepic2 from "../Assets/storedesign2.png";
import './landingpage.css'

function Landingpage() {
  return (
    <div className="lg:flex mx-5 lg:max-h-[800px] bg-white" id="video-section">
      <div className="flex flex-col mb-5 mt-5 lg:w-1/2 gap-5 items-center p-6 lg:p-8 space-y-8 lg:space-y-0 bg-gray-50 border border-gray-200 rounded-xl shadow-lg">
        <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl flex mx-auto font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 animate-slide-in">
            WHY BANAU?
          </h1>
          <p className="text-lg flex justify-center text-gray-700 mb-6 px-4 md:px-8 lg:px-0">
            Discover the ultimate e-commerce solution with Shop at Banau. Effortlessly customizable, and entirely code-free, Banau empowers anyone to build and manage their online store with ease.
          </p>
          <Link to={'/buildstore'} className="px-8 py-3 flex mx-auto bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-full hover:shadow-lg transition transform hover:scale-105">
            Get Started
          </Link>
        </div>

        <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-4 mt-4">
          <Feature icon="📦" title="Order Management" />
          <Feature icon="📊" title="Inventory Management" />
          <Feature icon="👨‍💼" title="Employee Management" />
        </div>

        <div className="flex flex-row sm:flex-row sm:justify-center lg:justify-start gap-6 mt-6">
          <Stat number="100+" label="Stores" />
          <Stat clas number="∞" label="Customization" />
          <Stat number="10+" label="Presets" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-4">
        <div className="relative p-2 md:p-6 border flex items-center justify-center border-gray-200 rounded-xl shadow-lg h-full">
          <iframe className="w-full h-[350px] md:h-[500px] lg:h-[400px] 2xl:h-[520px] rounded-xl" src="https://www.youtube.com/embed/L9S9Ci_mgrE" title="Why Banau?" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}

const Feature = ({ icon, title }) => (
  <div className="flex items-center space-x-2 bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition w-[180px] max-w-xs lg:max-w-none">
    <span className="text-xl">{icon}</span>
    <span className="text-gray-700 font-semibold">{title}</span>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="flex flex-col items-center">
    <p className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-700 text-white text-lg flex justify-center items-center font-bold rounded-full">
      {number}
    </p>
    <span className="text-gray-700 font-bold mt-2">{label}</span>
  </div>
);

export default Landingpage;
