import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  HiOutlineSearch,     // For the search icon
  HiOutlineEye,         // For the view/eye icon
  HiOutlinePencil,      // For the edit/pencil icon
  HiOutlineTrash,       // For the delete/trash icon
  HiOutlineDotsVertical // For the three dots in the card
} from 'react-icons/hi'; // Assuming Heroicons for consistency
import Title from './components/Title';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Main Delivery Dashboard Component
const DeliveryDashboard = () => {
  // Dummy data for delivery dashboard cards
  const [deliveryStats, setDeliveryStats] = useState({
    totalDelivery: { value: '300', change: '14.4%', isPositive: true },
    newDelivery: { value: '20', change: '20%', isPositive: true },
    deliveredToday: { value: '1500', change: '20%', isPositive: true }, // Renamed for clarity
  });

  // Dummy data for Delivery table
  const [allDeliveries, setAllDeliveries] = useState([
    { id: '#DEL001', name: 'John Doe', phone: '+1234567890', activeOrder: 25, completed: 200, status: 'Active' },
    { id: '#DEL002', name: 'Jane Smith', phone: '+1234567891', activeOrder: 5, completed: 150, status: 'Suspended' },
    { id: '#DEL003', name: 'Emily Davis', phone: '+1234567892', activeOrder: 30, completed: 300, status: 'Waiting' },
    { id: '#DEL004', name: 'Michael Brown', phone: '+1234567893', activeOrder: 10, completed: 180, status: 'Active' },
    { id: '#DEL005', name: 'Sarah Wilson', phone: '+1234567894', activeOrder: 12, completed: 90, status: 'Waiting' },
    { id: '#DEL006', name: 'David Lee', phone: '+1234567895', activeOrder: 8, completed: 210, status: 'Suspended' },
    { id: '#DEL007', name: 'Laura Garcia', phone: '+1234567896', activeOrder: 18, completed: 120, status: 'Active' },
    { id: '#DEL008', name: 'James Martinez', phone: '+1234567897', activeOrder: 7, completed: 50, status: 'Waiting' },
    { id: '#DEL009', name: 'Olivia Rodriguez', phone: '+1234567898', activeOrder: 22, completed: 250, status: 'Active' },
    { id: '#DEL010', name: 'William Hernandez', phone: '+1234567899', activeOrder: 3, completed: 70, status: 'Suspended' },
    { id: '#DEL011', name: 'Sophia Lopez', phone: '+1234567800', activeOrder: 15, completed: 190, status: 'Active' },
    { id: '#DEL012', name: 'Daniel Gonzalez', phone: '+1234567801', activeOrder: 28, completed: 320, status: 'Waiting' },
    { id: '#DEL013', name: 'Ava Perez', phone: '+1234567802', activeOrder: 6, completed: 100, status: 'Suspended' },
    { id: '#DEL014', name: 'Matthew Sanchez', phone: '+1234567803', activeOrder: 19, completed: 230, status: 'Active' },
    { id: '#DEL015', name: 'Isabella Rivera', phone: '+1234567804', activeOrder: 9, completed: 110, status: 'Waiting' },
  ]);

  const [chartPeriod, setChartPeriod] = useState('This week');
  const [activeTab, setActiveTab] = useState('All Delivery');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Based on the image's visible rows

  // Filtered deliveries based on tab and search term
  const filteredDeliveries = allDeliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.name.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesTab = true;
    if (activeTab === 'Active') {
      matchesTab = delivery.status === 'Active';
    } else if (activeTab === 'Accept Waiting') {
      matchesTab = delivery.status === 'Waiting';
    } else if (activeTab === 'Suspended') {
      matchesTab = delivery.status === 'Suspended';
    }
    return matchesSearch && matchesTab;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeliveries = filteredDeliveries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  // Dynamically calculate the count for each tab
  const allDeliveryCount = allDeliveries.length;
  const activeCount = allDeliveries.filter(d => d.status === 'Active').length;
  const waitingCount = allDeliveries.filter(d => d.status === 'Waiting').length;
  const suspendedCount = allDeliveries.filter(d => d.status === 'Suspended').length;

  // Chart.js Data and Options
  const productStatusesData = {
    labels: ['Delivered', 'Returned', 'On The Way'],
    datasets: [
      {
        data: [53, 40, 7], // Example percentages
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  const productStatusesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll render custom legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    },
  };

  const deliveryStatusesData = {
    labels: ['Active', 'Suspended'], // Added 'Top' from original chart, assuming it refers to "best performers"
    datasets: [
      {
        label: 'Number of Deliveries',
        data: [640, 480], // Example values
        backgroundColor: ['#10B981', '#EF4444'],
        borderColor: ['#10B981', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  const deliveryStatusesOptions = {
    indexAxis: 'y', // Horizontal bars
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 800, // Max value based on example data
        ticks: {
          stepSize: 200,
          color: '#6B7280',
        },
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        grid: {
          display: false, // Hide horizontal grid lines
        },
        ticks: {
          color: '#1F2937',
        }
      },
    },
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPagesToShow) {
        if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
            endPage = maxPagesToShow;
        } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
            startPage = totalPages - maxPagesToShow + 1;
        } else {
            startPage = currentPage - Math.floor(maxPagesToShow / 2);
            endPage = currentPage + Math.floor(maxPagesToShow / 2) - 1;
        }
    }

    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
            pageNumbers.push('...');
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
    }

    return pageNumbers;
};


  return (
    <div className="min-h-screen p-6 font-inter" style={{ backgroundColor: '#F3F4F6' }}>
      <header className="mb-4">
        <Title title="Delivery Overview" />
        {/* <h1 className="text-3xl font-bold" style={{ color: '#1F2937' }}>Delivery Overview</h1> */}
      </header>
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Top Seller Stats Cards */}
        <div className="grid grid-cols-1 w-full md:w-[300px] gap-4 mb-6">
          <DashboardCard
            title="Total Delivery"
            value={deliveryStats.totalDelivery.value}
            change={deliveryStats.totalDelivery.change}
            isPositive={deliveryStats.totalDelivery.isPositive}
          />
          <DashboardCard
            title="New Delivery"
            value={deliveryStats.newDelivery.value}
            change={deliveryStats.newDelivery.change}
            isPositive={deliveryStats.newDelivery.isPositive}
          />
          <DashboardCard
            title="Delivered Today"
            value={deliveryStats.deliveredToday.value}
            change={deliveryStats.deliveredToday.change}
            isPositive={deliveryStats.deliveredToday.isPositive}
          />
        </div>

        {/* Delivery Overview Chart Section */}
        <div className="bg-white p-6 rounded-lg max-w-full flex-1 flex flex-col shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#1F2937' }}>Delivery Overview</h2>
            <div className="flex gap-2 text-sm font-medium">
              <button
                onClick={() => setChartPeriod('This week')}
                className={`py-1 px-3 rounded-md transition-colors duration-200 ${
                  chartPeriod === 'This week'
                    ? 'text-white shadow-md'
                    : 'text-gray-800'
                }`}
                style={{
                  backgroundColor: chartPeriod === 'This week' ? 'rgb(4,120,87)' : '#F3F4F6',
                  color: chartPeriod === 'This week' ? '#FFFFFF' : '#1F2937'
                }}
              >
                This week
              </button>
              <button
                onClick={() => setChartPeriod('Last week')}
                className={`py-1 px-3 rounded-md transition-colors duration-200 ${
                  chartPeriod === 'Last week'
                    ? 'text-white shadow-md'
                    : 'text-gray-800'
                }`}
                style={{
                  backgroundColor: chartPeriod === 'Last week' ? 'rgb(4,120,87)' : '#F3F4F6',
                  color: chartPeriod === 'Last week' ? '#FFFFFF' : '#1F2937'
                }}
              >
                Last week
              </button>
            </div>
          </div>

          {/* Product Statuses and Delivery Statuses Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Statuses Chart (Doughnut Chart) */}
            <div className="bg-white p-4 rounded-lg flex flex-col items-center">
              <h3 className="text-md font-semibold mb-4" style={{ color: '#1F2937' }}>Products Statuses</h3>
              <div className="w-48 h-48 mb-4">
                <Doughnut data={productStatusesData} options={productStatusesOptions} />
              </div>
              <div className="flex flex-col space-y-2 text-sm" style={{ color: '#6B7280' }}>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#10B981' }}></span> Delivered: 53%
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#F59E0B' }}></span> Returned: 40%
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#EF4444' }}></span> On The Way: 7%
                </div>
              </div>
            </div>

            {/* Delivery Statuses Chart (Horizontal Bar Chart) */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-md font-semibold mb-4" style={{ color: '#1F2937' }}>Delivery Statuses</h3>
              <div className="h-64">
                <Bar data={deliveryStatusesData} options={deliveryStatusesOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex flex-wrap gap-2 text-sm font-medium" style={{ color: '#4B5563' }}>
            {/* Tabs for filtering */}
            <button
              onClick={() => setActiveTab('All Delivery')}
              className={`py-2 px-4 rounded-md transition-colors duration-200 ${
                activeTab === 'All Delivery' ? 'text-white shadow-md' : 'text-gray-800'
              }`}
              style={{
                backgroundColor: activeTab === 'All Delivery' ? 'rgb(4,120,87)' : '#F3F4F6',
                color: activeTab === 'All Delivery' ? '#FFFFFF' : '#1F2937'
              }}
            >
              All Delivery ({allDeliveryCount})
            </button>
            <button
              onClick={() => setActiveTab('Active')}
              className={`py-2 px-4 rounded-md transition-colors duration-200 ${
                activeTab === 'Active' ? 'text-white shadow-md' : 'text-gray-800'
              }`}
              style={{
                backgroundColor: activeTab === 'Active' ? 'rgb(4,120,87)' : '#F3F4F6',
                color: activeTab === 'Active' ? '#FFFFFF' : '#1F2937'
              }}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setActiveTab('Accept Waiting')}
              className={`py-2 px-4 rounded-md transition-colors duration-200 ${
                activeTab === 'Accept Waiting' ? 'text-white shadow-md' : 'text-gray-800'
              }`}
              style={{
                backgroundColor: activeTab === 'Accept Waiting' ? 'rgb(4,120,87)' : '#F3F4F6',
                color: activeTab === 'Accept Waiting' ? '#FFFFFF' : '#1F2937'
              }}
            >
              Accept Waiting ({waitingCount})
            </button>
            <button
              onClick={() => setActiveTab('Suspended')}
              className={`py-2 px-4 rounded-md transition-colors duration-200 ${
                activeTab === 'Suspended' ? 'text-white shadow-md' : 'text-gray-800'
              }`}
              style={{
                backgroundColor: activeTab === 'Suspended' ? 'rgb(4,120,87)' : '#F3F4F6',
                color: activeTab === 'Suspended' ? '#FFFFFF' : '#1F2937'
              }}
            >
              Suspended ({suspendedCount})
            </button>
          </div>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by delivery ID or name"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#D1D5DB', outlineColor: 'rgb(4,120,87)', '--tw-ring-color': 'rgb(4,120,87)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <HiOutlineSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: '#9CA3AF' }}
              size={20} // You can adjust size as needed
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <div className="max-w-[250px] lg:min-w-full ">
            <table className="min-w-full divide-y" style={{ borderColor: '#E5E7EB' }}>
              <thead style={{ backgroundColor: '#F0FDF4' }}>
                <tr>
                  {['Delivery Id', 'Name', 'Phone', 'Active Order', 'Completed', 'Status', 'Action'].map(header => (
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
                {currentDeliveries.length > 0 ? (
                  currentDeliveries.map((delivery, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#111827' }}>{delivery.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{delivery.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{delivery.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{delivery.activeOrder}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{delivery.completed}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                          style={{
                            backgroundColor:
                              delivery.status === 'Active' ? '#D1FAE5' : // bg-green-100
                              delivery.status === 'Waiting' ? '#FEF3C7' : // bg-yellow-100
                              delivery.status === 'Suspended' ? '#FEE2E2' : '', // bg-red-100
                            color:
                              delivery.status === 'Active' ? '#065F46' : // text-green-800
                              delivery.status === 'Waiting' ? '#92400E' : // text-yellow-800
                              delivery.status === 'Suspended' ? '#991B1B' : '' // text-red-800
                          }}
                        >
                          {delivery.status}
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
                    <td colSpan="7" className="px-6 py-4 text-center" style={{ color: '#6B7280' }}>No Delivery found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <span className="text-sm text-gray-700 mb-4 md:mb-0" style={{ color: '#4B5563' }}>
            Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredDeliveries.length)}</span> of <span className="font-semibold">{filteredDeliveries.length}</span> entries
          </span>
          <nav className="flex flex-col md:flex-row justify-between items-center items-center space-x-2">
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
                  disabled={typeof page !== 'number' || currentPage === page}
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
      {/* <HiOutlineDotsVertical
        className="cursor-pointer"
        style={{ color: '#9CA3AF' }}
        size={20}
      /> */}
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

export default DeliveryDashboard;