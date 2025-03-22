import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { log_out } from "../Redux/Actions/authaction";
import { sidebarItem, toggleitem } from "../constants/constants";
import { setActiveCategory } from '../Redux/Slices/videoSlice'; 
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const open = useSelector((store) => store.app.open);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [color, setColor] = useState("Home");

  const handleItemClick = (item) => {
    if (item.action === "logout") {
      dispatch(log_out());
    } else if (item.action === "changeCategory") {
      dispatch(setActiveCategory(item.title)); 
    }
  };

  const handleNavigation = (item) => {
    if (item.title === 'Liked Videos') {
      navigate('/liked'); 
    }
  };

  const hoverBtn = (item) => {
    if (color !== item.title) {
      setColor(item.title);
    }
  };

  return (
    <div className={`h-[calc(100vh-4.8rem)] xl:h-[calc(100vh-4.62rem)] overflow-x-hidden z-[100] top-[77px] fixed cursor-pointer ${open ? "w-[45%] ys:w-[40%] sm:w-[30%] md:w-[25%] lg:w-[16%] xl:w-[12%]  custom-scroll-y hover:overflow-y-scroll" : "lg:w-[8%] w-[0%]"} bg-white dark:bg-[#0f0f0f]`}>
      {open ? (
        sidebarItem.map((item, index) => (
          <div 
            key={index} 
            onClick={() => {
              hoverBtn(item);
              handleItemClick(item);
              handleNavigation(item);
            }} 
            className={`flex items-center ${color === item.title ? 'bg-[#F2F2F2] dark:bg-gray-900' : ' bg-white dark:bg-[#0f0f0f]'} hover:bg-[#F2F2F2] hover:dark:bg-gray-900 rounded-xl md:mx-2 md:px-1 py-3`}
          >
            <button className="flex w-auto gap-3 md:gap-6 items-center dark:bg-transparent">
              {item.icon}
              <h1 className="text-[14px] leading-[20px] font-rob pt-[2px] dark:text-white  dark:bg-transparent">
                {item.title}
              </h1>
            </button>
          </div>
        ))
      ) : (
        toggleitem.map((item, i) => (
          <div 
            key={i} 
            onClick={() => {
              hoverBtn(item);
              handleItemClick(item);
            }} 
            className="flex flex-col gap-1 py-2 px-4 my-3 dark:bg-[#0f0f0f] dark:text-white"
          >
            {item.icon}
            <h1 className="text-[10px]">
              {item.title}
            </h1>
          </div>
        ))
      )}
    </div>
  );
};

export default SideBar;
