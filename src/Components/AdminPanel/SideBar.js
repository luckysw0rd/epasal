import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdOutlineDashboard, MdStore, MdEdit, MdShop2 } from "react-icons/md";
import { FaUserAlt, FaClipboardList, FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSiderBar } from "./SiderBarContext";
import banau from '../../Assets/banau.png';

const SideBar = ({ setDashboardState }) => {
  const navigate = useNavigate();
  const { open, setOpen } = useSiderBar();

  const handleLogout = () => {
    try {
      navigate("/");
    } catch (error) {
      /* Handle logout error */
    }
  };

  const menus = [
    { name: "General", link: "/adminpanel", icon: MdEdit },
    { name: "Home", link: "/adminpanel", icon: MdOutlineDashboard },
    { name: "Employee", link: "/adminpanel", icon: FaUserAlt },
    { name: "Order", link: "/adminpanel", icon: FaClipboardList },
    { name: "Product", link: "/adminpanel", icon: FaBox },
    { name: "Edit Store", link: "/adminpanel", icon: MdEdit },

  ];

  return (
    <section className="flex gap-6 relative">
      <div
        className={` 
          min-h-screen
          h-full
          w-[250px] 
          bg-white
          relative
          top-0 
          left-0 
          z-50 
          transition-all
          duration-500 
          shadow-lg
        `}
      >
        <div className=" flex fixed font-Roboto flex-col justify-between h-full">
          <div>
            <div className="py-2 flex justify-center flex-row">
              <h1 className="text-3xl font-bold text-black bg-black h-6 w-6  px-1 py-1 mr-4 mt-9 rounded-3xl decoration-underline decoration-blue-500">
              </h1>
              <img src={banau} className="h-10 mt-7 filter invert" alt="Logo" />

            </div>
            <hr className="mt-4 border-gray-400 px-8 w-[175px]  ml-9"></hr>
            <Link
  onClick={() => {
    setDashboardState("Shop");
  }}
  className={`flex mt-0 w-full items-center ml-5 text-lg gap-4 font-medium p-3 hover:bg-green-300  rounded-sm transition-colors duration-200 shadow-lg transform hover:scale-105`}
>
  <span className="pl-2 ml-7 text-2xl font-Cinzel text-green-800">Shop</span>
  {React.createElement(MdShop2, { size: 24, className: "text-green-500" })}
</Link>
            <hr className="mt-0 border-gray-400 px-8 w-[175px]  ml-9"></hr>

            <div className="mt-[60px] flex flex-col justify-center gap-4 text-gray-700">
              {menus.map((menu, i) => (
                <Link
                  key={i}
                  onClick={() => {
                    setDashboardState(menu.name)
                  }}
                  className={`flex w-40 items-center ml-12 text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200 ${menu.margin ? "mt-5" : ""}`}
                >
                  {React.createElement(menu.icon, { size: 20 })}
                  <span className="pl-2">{menu.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mb-[80px]">
            <div className="flex    justify-center items-center">
              <hr className="border-gray-400 px-8 w-[175px]  ml-9" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex ml-12 items-center text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200"
            >
              <FiSettings size={20} />
              <span className="pl-2">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex ml-12 items-center text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200"
            >
              <FiLogOut size={20} />
              <span className="pl-2">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
