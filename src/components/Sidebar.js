import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaBoxOpen } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiCoupon2Line } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';

const links = [
  { label: 'My Account', path: '/profile', icon: <FaUserCircle />, title: 'Account' },
  { label: 'Orders', path: '/profile/orders', icon: <FaBoxOpen />, title: 'Orders' },
  { label: 'Notifications', path: '/profile/notifications', icon: <IoMdNotificationsOutline />, title: 'Notification' },
  { label: 'My Vouchers', path: '/profile/my-vouchers', icon: <RiCoupon2Line />, title: 'Vouchers' },
  { label: 'Log Out', path: '/', icon: <FiLogOut />, title: 'logout' },
];

const Sidebar = () => {
  return (
    <div className="w-16 md:w-56 bg-white shadow rounded-lg px-2 py-6 md:py-12">
      <ul className="space-y-8 pl-0">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.path}
              title={link.title}
              end={link.path === '/profile'} // التفعيل فقط إذا كان المسار مطابق تماماً
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-0 md:gap-4 px-2 md:px-3 py-2 rounded-md text-md font-medium transition no-underline
                ${isActive ? 'bg-[#A8C686]/50 text-green' : 'text-gray-700 hover:bg-gray-100'} `
              }
            >
              <div className="text-xl sm:p-1 md:p-2">{link.icon}</div>
              <span className="hidden md:inline">{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
