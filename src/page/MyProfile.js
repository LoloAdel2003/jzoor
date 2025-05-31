import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
const MyProfile = () => {
  return (
    <div className=" min-h-screen sm:pt-[60px]  md:pt-[120px] pb-[60px] container 
    ">
              <h2 className=" sm:text-xl md:text-3xl font-bold text-[#4B5929] mb-4">My Profile</h2>
<div className="flex gap-2">
      <Sidebar />
      <div className="flex-1 p-4 bg-white  ">
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default MyProfile;
