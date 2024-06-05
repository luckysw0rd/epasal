import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";

import { FiMessageSquare } from "react-icons/fi";
import { FiClipboard, FiLogOut } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { MdMedicalServices } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { useSiderBar } from "../../Context/SiderBarContext";
const SideBar = () => {
  const navigate = useNavigate();
  const { open, setOpen } = useSiderBar();

  const handleLogout = () => {
    // Handle logout logic here
    try {
      navigate("/");
    } catch (error) {
      /* Handle logout error */
    }
  };
  const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "test", link: "/test", icon: FaUserDoctor },
  ];

  return (
    <section className="flex gap-6 relative">
      <div
        className={` 
          min-h-screen
          w-[180px] 
          bg-[#0e0e0e]
          fixed
          top-0 
          left-0 
          z-50 
          transition-all
          duration-500 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:w-[215px] 
          lg:w-[250px]
        `}
      >
        <div
          className="py-3 flex justify-start text-gray-50 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <p className="ml-2 text-lg">Dashboard</p>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative text-[#70d8bd]">
          {menus?.map((menu, i) => (
            <Link
              onClick={(e) => setOpen(false)}
              to={menu?.link}
              key={i}
              className={` ${menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="group flex items-center text-white text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
          >
            <div>
              <FiLogOut size={20} />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
            >
              Logout
            </h2>
            <h2
              className={`${open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Logout
            </h2>
          </button>
        </div>
        {/* Your sidebar content here */}
      </div>
    </section>
  );
};

export default SideBar;
