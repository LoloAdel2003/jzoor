import React, { useState, useEffect, useMemo } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Dashboard Card Component (unchanged)
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

// Main Sellers Dashboard Component
const SellersDashboard = () => {
  // Dummy data for seller dashboard cards
  const [sellerStats, setSellerStats] = useState({
    totalSellers: { value: '300', change: '14.4%', isPositive: true },
    newSellers: { value: '20', change: '20%', isPositive: true },
    totalSalesValue: { value: '250.995$', change: '20%', isPositive: true },
  });

  // Dummy data for sellers table
  const [sellers, setSellers] = useState([
    { id: '#SELL001', name: 'John Doe', phone: '+1234567890', productCount: 25, joinDate: '01-01-2025', status: 'Active' },
    { id: '#SELL002', name: 'John Doe', phone: '+1234567890', productCount: 25, joinDate: '01-01-2025', status: 'Active' },
    { id: '#SELL003', name: 'John Doe', phone: '+1234567890', productCount: 25, joinDate: '01-01-2025', status: 'Active' },
    { id: '#SELL004', name: 'John Doe', phone: '+1234567890', productCount: 25, joinDate: '01-01-2025', status: 'Active' },
    { id: '#SELL005', name: 'Jane Smith', phone: '+1234567890', productCount: 5, joinDate: '01-01-2025', status: 'Suspended' },
    { id: '#SELL006', name: 'Emily Davis', phone: '+1234567890', productCount: 30, joinDate: '01-01-2025', status: 'Waiting' },
    { id: '#SELL007', name: 'Jane Smith', phone: '+1234567890', productCount: 5, joinDate: '01-01-2025', status: 'Suspended' },
    { id: '#SELL008', name: 'John Doe', phone: '+1234567890', productCount: 25, joinDate: '01-01-2025', status: 'Active' },
    { id: '#SELL009', name: 'Emily Davis', phone: '+1234567890', productCount: 30, joinDate: '01-01-2025', status: 'Waiting' },
    { id: '#SELL010', name: 'Jane Smith', phone: '+1234567890', productCount: 5, joinDate: '01-01-2025', status: 'Suspended' },
  ]);

  const [chartPeriod, setChartPeriod] = useState('This week');
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Based on the image's visible rows

  // Calculate counts for each status using useMemo for efficiency
  const sellerCounts = useMemo(() => {
    const counts = {
      All: sellers.length,
      Active: sellers.filter(seller => seller.status === 'Active').length,
      Waiting: sellers.filter(seller => seller.status === 'Waiting').length,
      Suspended: sellers.filter(seller => seller.status === 'Suspended').length,
    };
    return counts;
  }, [sellers]);

  // Dummy data for Product Statuses chart
  const productStatusData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [53, 40, 7], // Percentages from the image
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
        borderWidth: 2,
      },
    ],
  };

  const productStatusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We will render a custom legend
      },
      tooltip: {
        callbacks: {
          label: function(context) {
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
    cutout: '70%', // Creates the doughnut effect
  };

  // Dummy data for Sellers Statuses chart
  const sellersStatusData = {
    labels: ['Active', 'Top', 'Suspended'],
    datasets: [
      {
        data: [640, 240, 480], // Values from the image
        backgroundColor: ['#10B981', '#2563EB', '#EF4444'],
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
        borderWidth: 1,
      },
    ],
  };

  const sellersStatusOptions = {
    indexAxis: 'y', // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            return context.parsed.x; // Display the value
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
            callback: function(value) {
                return value; // Display raw numbers
            }
        }
      },
      y: {
        grid: {
          display: false,
        }
      },
    },
  };

  // Filter sellers based on activeTab and search term using useMemo
  const filteredSellers = useMemo(() => {
    let currentFiltered = sellers;

    // Filter by tab
    if (activeTab === 'Active') {
      currentFiltered = currentFiltered.filter(seller => seller.status === 'Active');
    } else if (activeTab === 'Waiting') { // 'Accept Waiting' in UI maps to 'Waiting' status
      currentFiltered = currentFiltered.filter(seller => seller.status === 'Waiting');
    } else if (activeTab === 'Suspended') {
      currentFiltered = currentFiltered.filter(seller => seller.status === 'Suspended');
    }
    // 'All' tab doesn't require filtering by status, it's the base list

    // Filter by search term
    const finalFiltered = currentFiltered.filter(seller =>
      seller.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(seller.productCount).toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.joinDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return finalFiltered;
  }, [sellers, activeTab, searchTerm]);


  // Reset page to 1 whenever tab or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSellers.length / itemsPerPage);

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
      pageNumbers.push(totalPages);
    }
    return pageNumbers.filter((value, index, self) => self.indexOf(value) === index);
  };

  return (
    <div className="min-h-screen p-4 font-inter" style={{ backgroundColor: '#F3F4F6' }}>
      <header className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#1F2937' }}>Sellers Overview</h1>
      </header>
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Top Seller Stats Cards */}
        <div className="grid grid-cols-1 w-full md:w-[300px] gap-4 mb-6">
          <DashboardCard
            title="Total Sellers"
            value={sellerStats.totalSellers.value}
            change={sellerStats.totalSellers.change}
            isPositive={sellerStats.totalSellers.isPositive}
          />
          <DashboardCard
            title="New Sellers"
            value={sellerStats.newSellers.value}
            change={sellerStats.newSellers.change}
            isPositive={sellerStats.newSellers.isPositive}
          />
          <DashboardCard
            title="Total Sales Value"
            value={sellerStats.totalSalesValue.value}
            change={sellerStats.totalSalesValue.change}
            isPositive={sellerStats.totalSalesValue.isPositive}
          />
        </div>

        {/* Sellers Overview Chart Section */}
        <div className="bg-white p-6 rounded-lg max-w-full flex-1 flex flex-col shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#1F2937' }}>Sellers Overview</h2>
            <div className="flex gap-2 text-sm font-medium">
              <button
                onClick={() => setChartPeriod('This week')}
                className={`py-1 px-3 rounded-md transition-colors duration-200 ${
                  chartPeriod === 'This week'
                    ? 'text-white shadow-md'
                    : 'text-gray-800'
                }`}
                style={{
                  backgroundColor: chartPeriod === 'This week' ? 'rgb(4,120,87)' : '#F3F4F6', // Changed color here
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
                  backgroundColor: chartPeriod === 'Last week' ? 'rgb(4,120,87)' : '#F3F4F6', // Changed color here
                  color: chartPeriod === 'Last week' ? '#FFFFFF' : '#1F2937'
                }}
              >
                Last week
              </button>
            </div>
          </div>

          {/* Product Statuses and Sellers Statuses Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Statuses Chart (Doughnut Chart) */}
            <div className="bg-white p-4 rounded-lg flex flex-col items-center">
              <h3 className="text-md font-semibold mb-4" style={{ color: '#1F2937' }}>Products Statuses</h3>
              <div className="w-48 h-48 mb-4">
                <Doughnut data={productStatusData} options={productStatusOptions} />
              </div>
              <div className="flex flex-col space-y-2 text-sm" style={{ color: '#6B7280' }}>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#10B981' }}></span> Approved: 53%
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#F59E0B' }}></span> Pending: 40%
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#EF4444' }}></span> Rejected: 7%
                </div>
              </div>
            </div>

            {/* Sellers Statuses Chart (Bar Chart) */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-md font-semibold mb-4" style={{ color: '#1F2937' }}>Sellers Statuses</h3>
              <div className="h-64"> {/* Increased height for better visibility of bars */}
                <Bar data={sellersStatusData} options={sellersStatusOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex flex-wrap gap-2 text-sm font-medium" style={{ color: '#4B5563' }}>
            {/* Tabs for filtering - adjusted to show dynamic counts */}
            {[
              { label: `All Sellers (${sellerCounts.All})`, status: 'All' },
              { label: `Active (${sellerCounts.Active})`, status: 'Active' },
              { label: `Accept Waiting (${sellerCounts.Waiting})`, status: 'Waiting' },
              { label: `Suspended (${sellerCounts.Suspended})`, status: 'Suspended' }
            ].map(tabInfo => (
              <button
                key={tabInfo.status}
                onClick={() => setActiveTab(tabInfo.status)}
                className={`py-2 px-4 rounded-md transition-colors duration-200 ${
                  activeTab === tabInfo.status
                    ? 'text-white shadow-md'
                    : 'text-gray-800'
                }`}
                style={{
                  backgroundColor: activeTab === tabInfo.status ? 'rgb(4,120,87)' : '#F3F4F6', // Changed color here
                  color: activeTab === tabInfo.status ? '#FFFFFF' : '#1F2937'
                }}
              >
                {tabInfo.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by seller id. name"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#D1D5DB', outlineColor: '#3B82F6', '--tw-ring-color': '#3B82F6' }}
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

        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <div className="max-w-[250px] lg:min-w-full ">

            <table className="min-w-full divide-y" style={{ borderColor: '#E5E7EB' }}>
              <thead style={{ backgroundColor: '#F0FDF4' }}>
                <tr>
                  {['Seller Id', 'Name', 'Phone', 'Product Count', 'Join Date', 'Status', 'Action'].map(header => (
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
                {currentSellers.length > 0 ? (
                  currentSellers.map((seller) => (
                    <tr key={seller.id}> {/* Changed key to seller.id for better performance */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#111827' }}>{seller.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{seller.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{seller.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{seller.productCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{seller.joinDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                          style={{
                            backgroundColor:
                              seller.status === 'Active' ? '#D1FAE5' : // bg-green-100
                              seller.status === 'Waiting' ? '#FEF3C7' : // bg-yellow-100
                              seller.status === 'Suspended' ? '#FEE2E2' : '', // bg-red-100
                            color:
                              seller.status === 'Active' ? '#065F46' : // text-green-800
                              seller.status === 'Waiting' ? '#92400E' : // text-yellow-800
                              seller.status === 'Suspended' ? '#991B1B' : '' // text-red-800
                          }}
                        >
                          {seller.status}
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
                    <td colSpan="7" className="px-6 py-4 text-center" style={{ color: '#6B7280' }}>No sellers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <span className="text-sm text-gray-700 mb-4 md:mb-0" style={{ color: '#4B5563' }}>
            Showing <span className="font-semibold">{filteredSellers.length > 0 ? indexOfFirstItem + 1 : 0}</span> to <span className="font-semibold">{indexOfFirstItem + currentSellers.length}</span> of <span className="font-semibold">{filteredSellers.length}</span> entries
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
                    backgroundColor: currentPage === page ? 'rgb(4,120,87)' : '#FFFFFF', // Changed color here
                    color: currentPage === page ? '#FFFFFF' : '#4B5563',
                    borderColor: currentPage === page ? 'rgb(4,120,87)' : '#D1D5DB', // Changed color here
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

export default SellersDashboard;