import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';


const Body = () => {
  return(
    <>
    
     <Navbar />
      <div className="flex">
        <SideBar />
        <Outlet />
        </div>
    </>
  )
};

export default Body;