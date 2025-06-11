import React, { useState, useMemo, useEffect } from 'react';
import Title from './components/Title';

// Main Orders Dashboard Component
const SellerOrdersDashboard = () => {
  // Dummy data for order dashboard cards
  const [orderStats, setOrderStats] = useState({
    totalOrders: { value: '1,240', change: '14.4%', isPositive: true },
    newOrders: { value: '240', change: '20%', isPositive: true },
    completedOrders: { value: '960', change: '8%', isPositive: true },
    canceledOrders: { value: '87', change: '5%', isPositive: false }, // Assuming 5% is a negative change for canceled orders
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
  const [showOnlyMyOrders, setShowOnlyMyOrders] = useState(false); // State for the checkbox
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Based on the image's visible rows

  // Recalculate total counts for tabs dynamically
  const totalOrdersCount = orders.length;
  const completedOrdersCount = orders.filter(order => order.status === 'Delivered').length;
  const pendingOrdersCount = orders.filter(order => order.status === 'Pending' || order.status === 'Preparing').length;
  const canceledOrdersCount = orders.filter(order => order.status === 'Canceled').length;

  // Reset page to 1 whenever a filter or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, showOnlyMyOrders]);

  // Filtered orders based on tab and search term
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()); // Added payment method to search

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

      // This is dummy logic for 'Show Only My Orders'
      // In a real app, you would filter by a user ID associated with the order.
      // For now, let's say "my orders" are orders with an even ID.
      const matchesMyOrders = showOnlyMyOrders ? (order.id % 2 === 0) : true;

      return matchesSearch && matchesTab && matchesMyOrders;
    });
  }, [orders, activeTab, searchTerm, showOnlyMyOrders]);

  // Pagination logic
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
    // Display up to 5 page numbers including ellipsis for navigation clarity
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
      // Ensure the last page is always shown if there are many pages
      if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }
    // Filter out duplicate ellipses or page numbers
    return pageNumbers.filter((value, index, self) => self.indexOf(value) === index);
  };

  return (
    <div className="min-h-screen p-4 font-inter" style={{ backgroundColor: '#F3F4F6' }}>
<Title title="Order List " />

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
                  backgroundColor: activeTab === tab ? 'rgb(4,120,87)' : '#F3F4F6', // <<< CHANGED HERE
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
                className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-600" // Optional: changed color to match
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
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: '#9CA3AF' }}
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
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
                    <tr key={order.id}> {/* Using order.id as a stable key */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input type="checkbox" className="h-4 w-4 text-green-700 border-gray-300 rounded" style={{ '--tw-ring-color': 'rgb(4,120,87)' }} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{order.id}.</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#111827' }}>{order.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>
                        <div className="flex items-center">
                          {/* Dynamic product image based on product name or a generic one */}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                          style={{
                            backgroundColor:
                              order.status === 'Delivered' ? '#D1FAE5' : // Green
                              order.status === 'Pending' ? '#FEF3C7' : // Yellow
                              order.status === 'Preparing' ? '#DBEAFE' : // Blue
                              order.status === 'Shipped' ? '#CFFAFE' : // Cyan
                              order.status === 'Canceled' ? '#FEE2E2' : '', // Red
                            color:
                              order.status === 'Delivered' ? '#065F46' : // Green
                              order.status === 'Pending' ? '#92400E' : // Yellow
                              order.status === 'Preparing' ? '#1E40AF' : // Blue
                              order.status === 'Shipped' ? '#0E7490' : // Cyan
                              order.status === 'Canceled' ? '#991B1B' : '' // Red
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {/* Eye Icon */}
                          <button className="text-gray-500 hover:text-gray-700" title="View">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          {/* Edit Icon */}
                          <button className="text-gray-500 hover:text-gray-700" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.827-2.828z" />
                            </svg>
                          </button>
                          {/* Delete Icon */}
                          <button className="text-gray-500 hover:text-red-600" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm6 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
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
                    backgroundColor: currentPage === page ? 'rgb(4,120,87)' : '#FFFFFF', // <<< CHANGED HERE
                    color: currentPage === page ? '#FFFFFF' : '#4B5563',
                    borderColor: currentPage === page ? 'rgb(4,120,87)' : '#D1D5DB', // <<< CHANGED HERE
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

// Reusing Dashboard Card Component from previous version
const DashboardCard = ({ title, value, change, isPositive }) => (
  <div className="p-6 rounded-lg shadow-md flex flex-col justify-between" style={{ backgroundColor: '#FFFFFF' }}>
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-medium" style={{ color: '#6B7280' }}>{title}</h3>
      <svg
        className="cursor-pointer"
        style={{ color: '#9CA3AF' }}
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        ></path>
      </svg>
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

export default SellerOrdersDashboard;