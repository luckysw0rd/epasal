import React, { useContext } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdOutlineDashboard, MdStore, MdEdit, MdShop2 } from "react-icons/md";
import { FaUserAlt, FaClipboardList, FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSiderBar } from "./SiderBarContext";
import banau from '../../Assets/banau.png';
import { AuthContext } from "../../Hooks/AuthContext";
const SideBar = ({ setDashboardState, role }) => {
  const navigate = useNavigate();
  
  const { open, setOpen } = useSiderBar();
  const auth = useContext(AuthContext);
  const handleLogout = () => {
    try {
      navigate("/");
    } catch (error) {
      /* Handle logout error */
    }
  };

  const menus = [
    ...(role === 'Admin' || role === 'Owner' || role === 'Staff' ? [{ name: "General", link: "/adminpanel", icon: MdEdit }] : []),
    ...(role === 'Admin' || role === 'Owner' || role === 'Staff' ? [{ name: "Home", link: "/adminpanel", icon: MdOutlineDashboard }] : []),
    ...(role === 'Admin' || role === 'Owner' ? [{ name: "Employee", link: "/adminpanel", icon: FaUserAlt }] : []),
    { name: "Order", link: "/adminpanel", icon: FaClipboardList },
    ...(role === 'Admin' || role === 'Owner' || role === 'Staff' ? [{ name: "Product", link: "/adminpanel", icon: FaBox }] : []),
    ...(role === 'Admin' || role === 'Owner' ? [{ name: "Edit Store", link: "/adminpanel", icon: MdEdit }] : []),

  ];

  return (
    <section className="flex gap-6 relative">
      <div
        className={` 
          min-h-screen
          h-full
         w-full
        sm:w-[250px] 

          bg-white
          relative
          top-0 
          left-0 
          z-10 
          transition-all
          duration-500 
          shadow-lg
        `}
      >
        <div className=" flex fixed font-Roboto flex-col  h-full  bg-slate-100 sm:bg-white ">
          <div>
          <div className="py-2 flex justify-center flex-row">
  <Link to="/">
    <img src={banau} className="h-10 mt-7" alt="Logo" />
  </Link>
</div>
            
            <Link
  onClick={() => {
    setDashboardState("Shop");
  }}
  className={`flex mt-0 w-[80%] sm:w-4/5 items-center ml-10 text-sm gap-4 font-medium p-3 border border-gray-300 hover:border-green-500 rounded-md transition-colors duration-200 mt-10`}
>
  {React.createElement(MdShop2, { size: 20 })}
  <span className=" text-sm font-Poppins ml-2">Banau Shop</span>
</Link>



           

            <div className="my-[40px] flex flex-col justify-center gap-1 text-gray-700">
              {menus.map((menu, i) => (
                <Link
                  key={i}
                  onClick={() => {
                    setDashboardState(menu.name)
                  }}
                  className={`flex w-40 items-center ml-12 text-lg gap-4  font-Poppins p-2 hover:bg-orange-100 rounded-md transition-colors duration-200 ${menu.margin ? "mt-" : ""}`}
                >

                  {React.createElement(menu.icon, { size: 20 })}
                  <span className="pl-0 m-2">{menu.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mb-[10px]">
            <div className="flex    justify-center items-center">
              <hr className="border-gray-400 px-8 w-[175px]  ml-9" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex ml-12 items-center text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200"
            >
              <FiSettings size={20} />
              <span className="pl-2" onClick={() => navigate('/settings')}>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex ml-12 items-center text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200"
            >
              <FiLogOut size={20} />
              <span className="pl-2" onClick={() => { auth.logout() }}>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
