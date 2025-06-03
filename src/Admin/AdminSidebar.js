import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartLine, FaUsers, FaTags } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { GrArticle, GrTransaction, GrAddCircle } from "react-icons/gr";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CgList } from "react-icons/cg";
import { MdOutlineReviews } from "react-icons/md";
import { RiAdminFill, RiMenuFoldLine } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { AiOutlineShop } from "react-icons/ai";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const links = [
    { to: '/admin', label: 'Dashboard', icon: <FaChartLine />, end: true },
    { to: '/admin/Order', label: 'Order Management', icon: <FaCartShopping /> },
    { to: '/admin/Article', label: 'Article Management', icon: <GrArticle /> },
    { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
    { to: '/admin/coupons', label: 'Coupons Code', icon: <FaTags /> },
    { to: '/admin/category', label: 'Categories', icon: <BiSolidCategoryAlt /> },
    { to: '/admin/transaction', label: 'Transactions', icon: <GrTransaction /> },
  ];

  const Product = [
    { to: '/admin/addProduct', label: 'Add Product', icon: <GrAddCircle /> },
    { to: '/admin/productList', label: 'Product List', icon: <CgList /> },
    { to: '/admin/productReview', label: 'Product Review', icon: <MdOutlineReviews /> },
  ];

  return (
    <aside
      className={`bg-white text-black min-h-screen p-4 shadow-md fixed h-screen overflow-y-auto custom-scroll-hide top-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
    >
      {/* الشعار وزر الإغلاق للشاشات الصغيرة */}
      <div className="flex justify-between items-center mb-4 ">
        <img src="imges/logo.png" alt="logo" className="w-[70px]" />
        <RiMenuFoldLine className="text-xl cursor-pointer" onClick={() => setSidebarOpen(false)} />
      </div>

      {/* محتوى الشريط الجانبي */}
      <div className="text-md my-4 text-gray-600">Main Menu</div>
      <nav className="space-y-3">
        {links.map(({ to, label, icon, end }) => (
          <NavLink
            to={to}
            key={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center no-underline gap-3 p-2 rounded-md hover:bg-green-800 transition ${
                isActive ? 'bg-green text-white font-bold' : 'text-gray-700'
              }`
            }
          >
            {icon} {label}
          </NavLink>
        ))}
      </nav>

      <div className="text-md mt-6 mb-2 text-gray-600">Product</div>
      <nav className="space-y-3">
        {Product.map(({ to, label, icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `flex items-center no-underline gap-3 p-2 rounded-md hover:bg-green-800 transition ${
                isActive ? 'bg-green text-white font-bold' : 'text-gray-700'
              }`
            }
          >
            {icon} {label}
          </NavLink>
        ))}
      </nav>

      <div className="text-md mt-6 mb-2 text-gray-600">Admin</div>
      <NavLink
        to="/admin/role"
        className={({ isActive }) =>
          `flex items-center no-underline gap-3 p-2 rounded-md hover:bg-green-800 transition ${
            isActive ? 'bg-green text-white font-bold' : 'text-gray-700'
          }`
        }
      >
        <RiAdminFill /> <span>Admin Role</span>
      </NavLink>

      {/* بيانات المستخدم */}
      <div className="pt-8 flex items-center justify-between">
        <img src="imges/17 Picture.png" alt="user" className="w-[40px]" />
        <div className="text-sm">
          <span className="block">Ahmad Kanaan</span>
        </div>
        <CiLogin className="text-xl" />
      </div>

      <div className="pt-4 flex items-center justify-between">
        <AiOutlineShop className="text-3xl" />
        <div className="text-sm">
          <span className="block">Your Shop</span>
        </div>
        <LuSquareArrowOutUpRight className="text-xl text-gray-700" />
      </div>
    </aside>
  );
};

export default AdminSidebar;
