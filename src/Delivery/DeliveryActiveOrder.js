import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

const App = () => {
  // Placeholder data for demonstration
  const originalOrders = [
    {
      orderId: '00075',
      clientName: 'Yara Yazgi',
      avatar: 'https://placehold.co/40x40/B3E5FC/2196F3?text=YY',
      date: '10Oct2025',
      address: 'Ramallah, Al-Tireh St',
      assignedTime: '12:30 PM',
      status: 'Picked Up',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 1,
    },
    {
      orderId: '00076',
      clientName: 'Nael Abd',
      avatar: 'https://placehold.co/40x40/FFCCBC/E64A19?text=NA',
      date: '10Oct2025',
      address: 'Gaza, Al-Rimail St',
      assignedTime: '10:30 PM',
      status: 'In Transit',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 2,
    },
    {
      orderId: '00077',
      clientName: 'Yara Yazgi',
      avatar: 'https://placehold.co/40x40/B3E5FC/2196F3?text=YY',
      date: '10Oct2025',
      address: 'Ramallah, Al-Tireh St',
      assignedTime: '12:30 PM',
      status: 'In Transit',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 2,
    },
  ];

  // Duplicate data to create more pages for demonstration
  // The previous error "Cannot read properties of undefined (reading 'substring')" was likely due to
  // the way orderId was generated in subsequent duplicates.
  // We'll generate unique orderIds using a combination of prefix and index for robustness.
  const duplicatedOrders1 = originalOrders.map((o, index) => ({
    ...o,
    orderId: `DUP1_${o.orderId}_${index}`,
    clientName: `${o.clientName} (Dupe1)`,
  }));

  const duplicatedOrders2 = originalOrders.map((o, index) => ({
    ...o,
    orderId: `DUP2_${o.orderId}_${index}`,
    clientName: `${o.clientName} (Dupe2)`,
  }));

  const allOrders = [...originalOrders, ...duplicatedOrders1, ...duplicatedOrders2];

  const [recentOrders, setRecentOrders] = useState(allOrders); // Use the full duplicated list

  const [activeTab, setActiveTab] = useState('All order');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3; // Display 3 orders per page

  // Calculate orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = recentOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(recentOrders.length / ordersPerPage);

  const chartRef = useRef(null); // Ref for the chart canvas
  const chartInstance = useRef(null); // Ref for the chart instance

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy existing chart instance before creating a new one
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Deliveries',
              data: [15, 20, 30, 54, 35, 25, 40], // Dummy data, changed Thursday to 54 for visual match
              borderColor: '#34D399', // Green color (equivalent to Tailwind green-500/600 sometimes)
              backgroundColor: 'rgba(52, 211, 153, 0.2)', // Light green fill
              tension: 0.4, // Smooth curve
              fill: true,
              pointRadius: 0, // Hide points by default, could be increased for small circles if desired
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false, // Hide legend
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // Hide x-axis grid lines
              },
              ticks: {
                color: '#6B7280', // Gray text for labels (equivalent to Tailwind gray-500)
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#E5E7EB', // Light gray grid lines (equivalent to Tailwind gray-200)
                borderDash: [5, 5], // Dashed grid lines
              },
              ticks: {
                callback: function (value) {
                  return value + 'k'; // Add 'k' to y-axis labels
                },
                color: '#6B7280', // Gray text (equivalent to Tailwind gray-500)
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup chart on component unmount
      }
    };
  }, []);

  // Helper function to render Lucide-like icons using inline SVGs
  const Icon = ({ name, size = 20, color = 'currentColor', className = '' }) => {
    switch (name) {
      case 'Truck':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
            <path d="M15 18H9"></path>
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.82a1 1 0 0 0-.84-1l-3.32-1.66A2 2 0 0 0 15 8.16V6a2 2 0 0 0-2-2h-3"></path>
            <circle cx="7" cy="18" r="2"></circle>
            <circle cx="17" cy="18" r="2"></circle>
          </svg>
        );
      case 'Package':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
          >
            <path d="M12.89 1.45L19.22 4c.82.32 1.25 1.22.9 2.05l-4.4 10.59a1 1 0 0 1-.92.65H8.38a1 1 0 0 1-.92-.65L3.88 6.05c-.34-.83.08-1.73.9-2.05l6.33-2.55a2 2 0 0 1 1.78 0z"></path>
            <path d="M2.89 15.5L7 17.5l4.33 2.16c.82.32 1.78.32 2.6 0L17 17.5l4.11-2"></path>
          </svg>
        );
      case 'Clock':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case 'MapPin':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      case 'Search':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        );
      case 'Phone':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
      case 'LocateFixed': // Using this for "Track" as it represents location
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
          >
            <line x1="2" x2="5" y1="12" y2="12"></line>
            <line x1="19" x2="22" y1="12" y2="12"></line>
            <line x1="12" x2="12" y1="2" y2="5"></line>
            <line x1="12" x2="12" y1="19" y2="22"></line>
            <circle cx="12" cy="12" r="7"></circle>
          </svg>
        );
      case 'MoreVertical':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        );
      case 'ChevronLeft':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>
        );
      case 'ChevronRight':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>
        );
      case 'Filter': // Added Filter icon SVG
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        );
      case 'Edit': // Added Edit icon SVG
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        );
      case 'Eye': // Added Eye icon SVG
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        );
      case 'Check': // Added Check icon SVG for timeline
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        );
      default:
        return null;
    }
  };

  const SummaryCard = ({ iconName, value, label }) => ( // Changed iconName to IconComponent
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm w-full">
      <div className="p-3 rounded-full" style={{ backgroundColor: '#D1FAE5' }}> {/* bg-green-100 */}
        <Icon name={iconName} size={24} style={{ color: '#059669' }} /> {/* text-green-600 */}
      </div>
      <div>
        <p className="text-xl font-semibold" style={{ color: '#1F2937' }}>{value}</p> {/* text-gray-800 */}
        <p className="text-sm" style={{ color: '#6B7280' }}>{label}</p> {/* text-gray-500 */}
      </div>
    </div>
  );

  const OrderItem = ({ order }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={order.avatar}
            alt={order.customerName}
            className="w-10 h-10 rounded-full border"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/B3E5FC/2196F3?text=YY'; }} // Fallback for avatar
            style={{ borderColor: '#E5E7EB' }} // border-gray-200
          />
          <div>
            <p className="font-medium" style={{ color: '#1F2937' }}>{order.customerName}</p> {/* text-gray-800 */}
            <p className="text-sm" style={{ color: '#6B7280' }}>Order#{order.orderId}</p> {/* Changed order.id to order.orderId */}
          </div>
        </div>
        <div className="cursor-pointer" style={{ color: '#9CA3AF' }}> {/* text-gray-400 */}
          <Icon name="MoreVertical" size={20} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm mb-4" style={{ color: '#4B5563' }}> {/* text-gray-600 */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2 md:mb-0">
          <Icon name="MapPin" size={16} style={{ color: '#9CA3AF' }} /> {/* Using FaMapMarkerAlt */}
          <span>{order.address}</span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Icon name="Clock" size={16} style={{ color: '#9CA3AF' }} /> {/* Using FaClock */}
          <span>Assigned: {order.assignedTime}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm mb-4">
        <span
          className={`font-medium px-2 py-1 rounded-full text-xs`}
          style={{
            backgroundColor:
              order.status === 'Picked Up' ? '#FFF7ED' : // bg-orange-100 (light orange)
              order.status === 'In Transit' ? '#FFFBEB' : // bg-yellow-100 (light yellow)
              order.status === 'Delivered' ? '#D1FAE5' : // bg-green-100 (light green)
              order.status === 'Waiting Picked up' ? '#DBEAFE' : // bg-blue-100 (light blue)
              '#FEE2E2', // default for other statuses like Canceled (red-100)
            color:
              order.status === 'Picked Up' ? '#EA580C' : // text-orange-600
              order.status === 'In Transit' ? '#D97706' : // text-yellow-600
              order.status === 'Delivered' ? '#059669' : // text-green-600
              order.status === 'Waiting Picked up' ? '#2563EB' : // text-blue-600
              '#DC2626', // default for other statuses like Canceled (red-600)
          }}
        >
          {order.status}
        </span>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-md transition-colors"
                  style={{ backgroundColor: '#F0FDF4', color: '#065F46' }}> {/* bg-green-50 text-green-700 */}
            <Icon name="Phone" size={16} />
            <span>Call</span>
          </button>
          <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-md transition-colors"
                  style={{ backgroundColor: '#F0FDF4', color: '#065F46' }}> {/* bg-green-50 text-green-700 */}
            <Icon name="LocateFixed" size={16} />
            <span>Track</span>
          </button>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="flex justify-between items-center relative py-2 mt-4">
        {order.progress.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center`}
                style={{
                  backgroundColor: index <= order.currentProgressIndex ? '#22C55E' : '#FFFFFF', // bg-green-500 or bg-white
                  borderColor: index <= order.currentProgressIndex ? '#22C55E' : '#D1D5DB', // border-green-500 or border-gray-300
                }}
              >
                {index <= order.currentProgressIndex && (
                  <Icon name="Check" size={10} /> // Using custom Check Icon
                )}
              </div>
              <p
                className={`mt-2 text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis`}
                style={{
                  color: index <= order.currentProgressIndex ? '#1F2937' : '#6B7280', // text-gray-800 or text-gray-500
                  fontWeight: index <= order.currentProgressIndex ? '500' : 'normal',
                }}
              >
                {step}
              </p>
            </div>
            {index < order.progress.length - 1 && (
              <div
                className={`flex-1 h-0.5`}
                style={{
                  backgroundColor: index < order.currentProgressIndex ? '#22C55E' : '#D1D5DB', // bg-green-500 or bg-gray-300
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8" style={{ backgroundColor: '#F3F4F6', color: '#1F2937' }}> {/* bg-gray-100 text-gray-900 */}
      {/* Header - Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard iconName="Truck" value="25" label="Active Orders" />
        <SummaryCard iconName="Package" value="10" label="Delivered Today" />
        <SummaryCard iconName="Clock" value="30min" label="Avg. Delivery Time" />
      </div>

      {/* Next Delivery */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4 sm:mb-0">
          <div className="p-3 rounded-full" style={{ backgroundColor: '#FEE2E2' }}> {/* bg-red-100 */}
            <Icon name="MapPin" size={24} style={{ color: '#DC2626' }} />
          </div>
          <div>
            <p className="text-lg font-semibold" style={{ color: '#1F2937' }}>10:30 AM - Al-Balou', Ramallah</p> {/* text-gray-800 */}
            <p className="text-sm" style={{ color: '#6B7280' }}>Next Delivery</p> {/* text-gray-500 */}
          </div>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-12 h-12 flex flex-col items-center justify-center rounded-lg font-bold text-lg relative"
               style={{ backgroundColor: '#DBEAFE', color: '#2563EB' }}> {/* bg-blue-100 text-blue-700 */}
            <span className="text-xs absolute top-1" style={{ color: '#6B7280' }}>July</span> {/* text-gray-500 */}
            <span className="mt-3">17</span>
          </div>
          <p className="text-sm" style={{ color: '#6B7280' }}>remaining orders</p> {/* text-gray-500 */}
          <p className="text-lg font-semibold" style={{ color: '#1F2937' }}>5</p> {/* text-gray-800 */}
        </div>
      </div>

      {/* Order List Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4">Order List</h2>

        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            {['All order (9)', 'Picked Up', 'In Transit', 'Canceled', 'Waiting Picked up'].map((tab) => ( // Updated total count
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                style={{
                  backgroundColor: activeTab === tab ? '#22C55E' : '#F3F4F6', // bg-green-500 or bg-gray-100
                  color: activeTab === tab ? '#FFFFFF' : '#374151', // text-white or text-gray-700
                  boxShadow: activeTab === tab ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto flex-grow md:flex-grow-0"> {/* Adjusted width for responsiveness */}
            <input
              type="text"
              placeholder="Search order report"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#D1D5DB', color: '#1F2937', outlineColor: '#22C55E' }} // border-gray-300 text-gray-900 focus:ring-green-500
            />
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-3 rtl:pr-3 pointer-events-none">
              <Icon name="Search" size={18} style={{ color: '#9CA3AF' }} />
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          {currentOrders.map((order) => ( // Display orders for the current page
            <OrderItem key={order.orderId} order={order} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}> {/* border-gray-200 */}
          <button
            className="flex items-center space-x-1 rtl:space-x-reverse hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed mb-2 sm:mb-0"
            style={{ color: '#4B5563' }}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={20} />
            <span>Previous</span>
          </button>
          <div className="flex space-x-2">
            {[...Array(totalPages).keys()].map(page => ( // Generate page numbers dynamically
              <button
                key={page + 1}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium`}
                style={{
                  backgroundColor: (page + 1) === currentPage ? '#22C55E' : '#F3F4F6', // Active page styling
                  color: (page + 1) === currentPage ? '#FFFFFF' : '#374151',
                }}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
          <button
            className="flex items-center space-x-1 rtl:space-x-reverse hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-0"
            style={{ color: '#4B5563' }}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <span>Next</span>
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
