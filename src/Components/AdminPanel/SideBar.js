import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdOutlineDashboard, MdStore, MdEdit } from "react-icons/md";
import { FaUserAlt, FaClipboardList, FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSiderBar } from "./SiderBarContext";

const SideBar = ({setDashboardState}) => {
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
        <div className="flex font-Roboto flex-col justify-between h-full">
          <div>
            <div className="py-2 flex justify-center">
              <h1 className="text-3xl font-bold text-black bg-yellow-400 px-4 py-1 mr-4 mt-6 rounded-lg decoration-underline decoration-blue-500">
                Epasal
              </h1>
            </div>
            <div className="mt-4 flex flex-col justify-center gap-4 text-gray-700">
              {menus.map((menu, i) => (
                // <Link
                //   // onClick={() => setOpen(false)}
                //   to={menu.link}
                //   key={i}
                //   className={`flex w-40 items-center ml-12 text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200 ${menu.margin ? "mt-5" : ""}`}
                // >
                //   {React.createElement(menu.icon, { size: 20 })}
                //   <span className="pl-2">{menu.name}</span>
                // </Link>
                <div className={`flex w-40 items-center ml-12 text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200 ${menu.margin ? "mt-5" : ""}`}>
                <button onClick={(e)=>{e.preventDefault();setDashboardState(menu.name)}}>{menu.name}</button>
                </div>
              ))}
            </div>
          </div>
          <div className=" mb-40">
            <div className=" flex justify-center">
              <hr className="border-gray-400 px-8 w-[200px]  my-4" />
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
