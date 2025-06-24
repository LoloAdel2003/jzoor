import React, { useState, useMemo, useEffect } from 'react';
import { HiOutlinePlus, HiOutlineChevronDown, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';
import { HiDotsVertical } from 'react-icons/hi';

// Main Orders Dashboard Component
const OrdersDashboard = () => {
  // Dummy data for order dashboard cards
  const [orderStats, setOrderStats] = useState({
    totalOrders: { value: '1,240', change: '14.4%', isPositive: true },
    newOrders: { value: '240', change: '20%', isPositive: true },
    completedOrders: { value: '960', change: '8%', isPositive: true },
    canceledOrders: { value: '87', change: '5%', isPositive: false },
  });

  // Dummy data for orders table
  const [orders, setOrders] = useState([
    { id: 1, orderId: '#ORD0001', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Visa', status: 'Pending' },
    { id: 2, orderId: '#ORD0002', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Visa', status: 'Delivered' },
    { id: 3, orderId: '#ORD0003', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Visa', status: 'Preparing' },
    { id: 4, orderId: '#ORD0004', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Cash', status: 'Shipped' },
    { id: 5, orderId: '#ORD0005', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Cash', status: 'Delivered' },
    { id: 6, orderId: '#ORD0006', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Visa', status: 'Canceled' },
    { id: 7, orderId: '#ORD0007', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Cash', status: 'Shipped' },
    { id: 8, orderId: '#ORD0008', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Visa', status: 'Delivered' },
    { id: 9, orderId: '#ORD0009', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Visa', status: 'Shipped' },
    { id: 10, orderId: '#ORD0010', product: 'Apploido', date: '01-01-2025', price: '49.99', paymentMethod: 'Visa', status: 'Preparing' },
    { id: 11, orderId: '#ORD0011', product: 'Product X', date: '01-02-2025', price: '25.00', paymentMethod: 'PayPal', status: 'Pending' },
    { id: 12, orderId: '#ORD0012', product: 'Product Y', date: '01-03-2025', price: '75.50', paymentMethod: 'Credit Card', status: 'Delivered' },
    { id: 13, orderId: '#ORD0013', product: 'Product Z', date: '01-04-2025', price: '120.00', paymentMethod: 'Bank Transfer', status: 'Canceled' },
    { id: 14, orderId: '#ORD0014', product: 'Apploido', date: '01-05-2025', price: '30.00', paymentMethod: 'Visa', status: 'Shipped' },
    { id: 15, orderId: '#ORD0015', product: 'Widget A', date: '01-06-2025', price: '15.00', paymentMethod: 'Cash', status: 'Preparing' },
    { id: 16, orderId: '#ORD0016', product: 'Gadget B', date: '01-07-2025', price: '60.00', paymentMethod: 'PayPal', status: 'Delivered' },
    { id: 17, orderId: '#ORD0017', product: 'Tool C', date: '01-08-2025', price: '90.00', paymentMethod: 'Visa', status: 'Pending' },
    { id: 18, orderId: '#ORD0018', product: 'Accessory D', date: '01-09-2025', price: '5.00', paymentMethod: 'Cash', status: 'Canceled' },
  ]);

  const [activeTab, setActiveTab] = useState('All orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyMyOrders, setShowOnlyMyOrders] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalOrdersCount = orders.length;
  const completedOrdersCount = orders.filter(order => order.status === 'Delivered').length;
  const pendingOrdersCount = orders.filter(order => order.status === 'Pending' || order.status === 'Preparing').length;
  const canceledOrdersCount = orders.filter(order => order.status === 'Canceled').length;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, showOnlyMyOrders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesTab = true;
      if (activeTab === 'Completed') {
        matchesTab = order.status === 'Delivered';
      } else if (activeTab === 'Pending') {
        matchesTab = order.status === 'Pending' || order.status === 'Preparing';
      } else if (activeTab === 'Canceled') {
        matchesTab = order.status === 'Canceled';
      } else if (activeTab === 'All orders') {
        matchesTab = true;
      }

      const matchesMyOrders = showOnlyMyOrders ? (order.id % 2 === 0) : true;

      return matchesSearch && matchesTab && matchesMyOrders;
    });
  }, [orders, activeTab, searchTerm, showOnlyMyOrders]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pageNumbers.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(currentPage + 1);
      }
      if (currentPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers.filter((value, index, self) => self.indexOf(value) === index);
  };

  return (
    <div className="min-h-screen p-4 font-inter" style={{ backgroundColor: '#F3F4F6' }}>
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold mb-4 md:mb-0" style={{ color: '#1F2937' }}>Order List</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white"
            style={{ backgroundColor: '#10B981' }}>
            <HiOutlinePlus className="h-5 w-5 mr-2" />
            Add Order
          </button>
          <button className="flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium"
            style={{ color: '#4B5563', backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }}>
            More Actions
            <HiOutlineChevronDown className="h-4 w-4 ml-2" />
          </button>
        </div>
      </header>

      {/* Order Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Total Orders"
          value={orderStats.totalOrders.value}
          change={orderStats.totalOrders.change}
          isPositive={orderStats.totalOrders.isPositive}
        />
        <DashboardCard
          title="New Orders"
          value={orderStats.newOrders.value}
          change={orderStats.newOrders.change}
          isPositive={orderStats.newOrders.isPositive}
        />
        <DashboardCard
          title="Completed Orders"
          value={orderStats.completedOrders.value}
          change={orderStats.completedOrders.change}
          isPositive={orderStats.completedOrders.isPositive}
        />
        <DashboardCard
          title="Canceled Orders"
          value={orderStats.canceledOrders.value}
          change={orderStats.canceledOrders.change}
          isPositive={orderStats.canceledOrders.isPositive}
        />
      </div>

      {/* Order List Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex flex-wrap gap-2 text-sm font-medium" style={{ color: '#4B5563' }}>
            {/* Tabs for filtering */}
            {['All orders', 'Completed', 'Pending', 'Canceled'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-md transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-white shadow-md'
                    : 'text-gray-800'
                }`}
                style={{
                  backgroundColor: activeTab === tab ? 'rgb(4,120,87)' : '#F3F4F6',
                  color: activeTab === tab ? '#FFFFFF' : '#1F2937'
                }}
              >
                {tab} ({
                  tab === 'All orders' ? totalOrdersCount :
                  tab === 'Completed' ? completedOrdersCount :
                  tab === 'Pending' ? pendingOrdersCount :
                  tab === 'Canceled' ? canceledOrdersCount : 0
                })
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center text-sm" style={{ color: '#4B5563' }}>
              <input
                id="showOnlyMyOrders"
                type="checkbox"
                className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-600"
                style={{ '--tw-ring-color': 'rgb(4,120,87)' }}
                checked={showOnlyMyOrders}
                onChange={(e) => setShowOnlyMyOrders(e.target.checked)}
              />
              <label htmlFor="showOnlyMyOrders" className="ml-2">Show Only My Orders</label>
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search order report"
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#D1D5DB', outlineColor: 'rgb(4,120,87)', '--tw-ring-color': 'rgb(4,120,87)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <GoSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: '#9CA3AF' }}
                size={20}
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto lg:overflow-x-visible" style={{ borderColor: '#E5E7EB', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <div className="max-w-[300px] lg:min-w-full">
            <table className="min-w-full divide-y" style={{ borderColor: '#E5E7EB' }}>
              <thead style={{ backgroundColor: '#F0FDF4' }}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>
                    <input type="checkbox" className="h-4 w-4 text-green-700 border-gray-300 rounded" style={{ '--tw-ring-color': 'rgb(4,120,87)' }} />
                  </th>
                  {/* تم تعديل ترتيب الـ headers هنا */}
                  {['No.', 'Order Id', 'Product', 'Date', 'Price', 'Payment Method', 'Status', 'Action'].map(header => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: '#065F46' }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input type="checkbox" className="h-4 w-4 text-green-700 border-gray-300 rounded" style={{ '--tw-ring-color': 'rgb(4,120,87)' }} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{order.id}.</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#111827' }}>{order.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>
                        <div className="flex items-center">
                          {order.product === 'Apploido' ? (
                            <img src="https://placehold.co/24x24/3B82F6/FFFFFF?text=A" alt="Apploido" className="w-6 h-6 rounded-full mr-2" />
                          ) : (
                            <img src="https://placehold.co/24x24/E0E0E0/FFFFFF?text=P" alt="Product" className="w-6 h-6 rounded-full mr-2" />
                          )}
                          {order.product}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>${order.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{order.paymentMethod}</td>
                      {/* تم تعديل ترتيب الـ cells هنا ليتوافق مع الـ headers */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                          style={{
                            backgroundColor:
                              order.status === 'Delivered' ? '#D1FAE5' :
                              order.status === 'Pending' ? '#FEF3C7' :
                              order.status === 'Preparing' ? '#DBEAFE' :
                              order.status === 'Shipped' ? '#CFFAFE' :
                              order.status === 'Canceled' ? '#FEE2E2' : '',
                            color:
                              order.status === 'Delivered' ? '#065F46' :
                              order.status === 'Pending' ? '#92400E' :
                              order.status === 'Preparing' ? '#1E40AF' :
                              order.status === 'Shipped' ? '#0E7490' :
                              order.status === 'Canceled' ? '#991B1B' : ''
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {/* Eye Icon */}
                          <button className="text-gray-500 hover:text-gray-700" title="View">
                            <HiOutlineEye className="h-5 w-5" />
                          </button>
                          {/* Edit Icon */}
                          <button className="text-gray-500 hover:text-gray-700" title="Edit">
                            <HiOutlinePencil className="h-5 w-5" />
                          </button>
                          {/* Delete Icon */}
                          <button className="text-gray-500 hover:text-red-600" title="Delete">
                            <HiOutlineTrash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center" style={{ color: '#6B7280' }}>No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <span className="text-sm text-gray-700 mb-4 md:mb-0" style={{ color: '#4B5563' }}>
            Showing <span className="font-semibold">{filteredOrders.length > 0 ? indexOfFirstItem + 1 : 0}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredOrders.length)}</span> of <span className="font-semibold">{filteredOrders.length}</span> entries
          </span>
          <nav className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: '#4B5563', backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }}
            >
              ← Previous
            </button>
            <div className="flex space-x-1">
              {renderPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && paginate(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-md
                    ${typeof page !== 'number' ? 'cursor-default border-transparent bg-transparent hover:bg-transparent' : ''}
                  `}
                  style={{
                    backgroundColor: currentPage === page ? 'rgb(4,120,87)' : '#FFFFFF',
                    color: currentPage === page ? '#FFFFFF' : '#4B5563',
                    borderColor: currentPage === page ? 'rgb(4,120,87)' : '#D1D5DB',
                    boxShadow: currentPage === page ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
                  }}
                  disabled={typeof page !== 'number'}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: '#4B5563', backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }}
            >
              Next →
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, change, isPositive }) => (
  <div className="p-6 rounded-lg shadow-md flex flex-col justify-between" style={{ backgroundColor: '#FFFFFF' }}>
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-medium" style={{ color: '#6B7280' }}>{title}</h3>
      <HiDotsVertical
        className="cursor-pointer"
        style={{ color: '#9CA3AF' }}
        size={20}
      />
    </div>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-semibold" style={{ color: '#111827' }}>{value}</span>
      <span className={`ml-2 text-sm font-medium`} style={{ color: isPositive ? '#10B981' : '#EF4444' }}>
        {isPositive ? '▲' : '▼'} {change}
      </span>
    </div>
    <p className="text-xs mt-2" style={{ color: '#6B7280' }}>Last 7 days</p>
  </div>
);

export default OrdersDashboard;