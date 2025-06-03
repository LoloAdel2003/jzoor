import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SellerHeader from './SellerHeader';
import SellerSidebar from './SellerSidebar';

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex relative">
      {/* خلفية رمادية شفافة */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SellerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* المحتوى الرئيسي */}
      <div className="flex-1">
        <SellerHeader setSidebarOpen={setSidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashboard;
