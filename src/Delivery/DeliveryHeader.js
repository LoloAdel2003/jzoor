import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineNotifications } from "react-icons/md";
import { RiMenuFold2Line } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const mockSearchData = [
  { id: 'p1', type: 'product', name: 'Chamomile Plant', img: '/imges/chamomile.webp', price: '10.00', category: 'Products' },
  { id: 'p2', type: 'product', name: 'Ceramic Pot - Small', img: '/imges/ceramic-pot.webp', price: '12.00', category: 'Pots' },
  { id: 'o1', type: 'order', name: 'Order #1234', customer: 'Ahmed Ali', status: 'Pending', link: '/admin/orders/1234' },
  { id: 'o2', type: 'order', name: 'Order #1235', customer: 'Lina S.', status: 'Shipped', link: '/admin/orders/1235' },
  { id: 'c1', type: 'customer', name: 'Sarah M.', email: 'sarah.m@example.com', link: '/admin/customers/sarah-m' },
  { id: 'n3', type: 'notification', name: 'Low Stock Alert: Olive Oil', description: 'Product "Olive Oil 1L" is running low.', link: '/admin/notification' },
  { id: 'p3', type: 'product', name: 'Jasmine Plant', img: '/imges/jasmine.webp', price: '15.00', category: 'Products' },
  { id: 'o3', type: 'order', name: 'Order #1236', customer: 'Khalid Z.', status: 'Delivered', link: '/admin/orders/1236' },
];

const DeliveryHeader = ({ setSidebarOpen }) => {
  const { notification } = useContext(ProductContext);  //هنا البيانات رح ناخدها من DB بدل json
  const location = useLocation();
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResultsDropdown, setShowSearchResultsDropdown] = useState(false);
  const searchRef = useRef(null);

  // 🔔 تحسب عدد الإشعارات غير المقروءة (مبدئيًا كلها غير مقروءة إن لم يوجد read)
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3)
  //   () => {
  //   return notification.filter(n => !n.isRead).length;
  // });

  const isNotificationsPage = location.pathname === '/admin/notification';

  const handleNotificationsClick = () => {
    setUnreadNotificationsCount(0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResultsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 1) {
      const filtered = mockSearchData.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        (item.customer && item.customer.toLowerCase().includes(term.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(term.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(term.toLowerCase()))
      );
      setSearchResults(filtered);
      setShowSearchResultsDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchResultsDropdown(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative z-40">
        {/* Left side */}
        <div className="flex gap-2 md:gap-3 items-center">
          <RiMenuFold2Line
            className="text-2xl text-gray-600 md:hidden cursor-pointer mr-2"
            onClick={() => setSidebarOpen(true)}
          />
          <div className="text-xl font-semibold text-[#333]">Dashboard</div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3.5 md:gap-4 lg:gap-4">
          {/* Mobile Search Icon */}
          <FaSearch
            className="text-[#666] text-xl cursor-pointer md:hidden"
            onClick={() => {
              setShowSearchMobile(!showSearchMobile);
              if (showSearchMobile) {
                setShowSearchResultsDropdown(false);
                setSearchTerm('');
              }
            }}
          />

          {/* Desktop Search Box */}
          <div ref={searchRef} className="hidden md:flex flex-col items-center w-60 relative">
            <input
              name="search"
              type="search"
              placeholder="Search products, orders, customers..."
              className="p-2 pr-8 rounded-xl w-full focus:outline-none border border-[#ccc] focus:border-[#4B5929] text-[#333] placeholder:text-[#999]"
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => searchTerm.length > 0 && setShowSearchResultsDropdown(true)}
            />
            <FaSearch className="text-[#999] text-base absolute right-2 top-1/2 -translate-y-1/2" />

            {/* Search Results Dropdown */}
            {showSearchResultsDropdown && (
              <div className="absolute top-full left-0 w-full bg-white text-[#333] rounded-lg shadow-lg mt-2 py-2 z-50 max-h-80 overflow-y-auto border border-[#ddd]">
                {searchResults.length === 0 ? (
                  <p className="px-4 py-2 text-sm text-[#777]">
                    {searchTerm.length > 1 ? `No results found for "${searchTerm}".` : 'Start typing to search...'}
                  </p>
                ) : (
                  <>
                    {['product', 'order', 'customer', 'notification'].map(type => {
                      const results = searchResults.filter(item => item.type === type);
                      if (results.length === 0) return null;

                      const headers = {
                        product: 'Products',
                        order: 'Orders',
                        customer: 'Customers',
                        notification: 'Notifications'
                      };

                      return (
                        <div key={type}>
                          <h4 className="px-4 py-2 text-sm font-semibold text-[#777] border-b">{headers[type]}</h4>
                          <ul>
                            {results.map(item => (
                              <li key={item.id} className="px-4 py-2 hover:bg-[#f9f9f9] cursor-pointer transition-colors">
                                <Link to={item.link || `/admin/${type}s/${item.id}`} className="flex items-center gap-2 text-sm" onClick={() => setShowSearchResultsDropdown(false)}>
                                  {item.img && <img src={item.img} alt={item.name} className="w-6 h-6 rounded-md object-cover" />}
                                  {type === 'order' && <FaShoppingCart className="text-[#888] text-xs" />}
                                  {type === 'customer' && <FaUserCircle className="text-[#888] text-xs" />}
                                  {type === 'notification' && <MdOutlineNotifications className="text-[#888] text-xs" />}
                                  <span>
                                    {item.name}
                                    {item.price && <span className="text-[#af926a] ml-1">${item.price}</span>}
                                    {item.email && <span className="text-[#999] ml-1 text-xs">({item.email})</span>}
                                    {item.status && <span className={`ml-1 font-medium ${item.status === 'Pending' ? 'text-[#ff9500]' : item.status === 'Shipped' ? 'text-[#4caf50]' : 'text-[#666]'}`}>{item.status}</span>}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Notification Icon */}
          <Link to="/delivery/notification" onClick={handleNotificationsClick} className="relative">
            <MdOutlineNotifications
              className={`text-[24px] md:text-2xl cursor-pointer transition-colors duration-200 ${
                isNotificationsPage ? 'text-[#4B5929]' : 'text-[#666666]'
              }`}
            />
            {unreadNotificationsCount > 0 && !isNotificationsPage && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ff4d4f] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md z-10">
                {unreadNotificationsCount}
              </span>
            )}
          </Link>

          {/* Profile Image */}
          <img src="/imges/seller.webp" alt="profile" className="w-[28px] h-[28px] rounded-full object-cover cursor-pointer" />
        </div>
      </header>

      {/* Mobile Search (optional) */}
      {showSearchMobile && (
        <div ref={searchRef} className="md:hidden px-4 py-3 bg-white shadow-md flex flex-col items-start gap-2 relative animate-slideDown">
          <input
            name="search"
            type="search"
            placeholder="Search..."
            className="border border-[#ccc] p-2 pr-8 rounded w-full focus:outline-none focus:border-[#4B5929] text-[#333]"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => searchTerm.length > 0 && setShowSearchResultsDropdown(true)}
          />
          <FaSearch className="text-[#666] text-base absolute right-8 top-1/2 -translate-y-1/2" />
        </div>
      )}
    </>
  );
};

export default DeliveryHeader;
