import React, { useState } from 'react';
import ReportChart from './components/ReportChart';
import {
  HiOutlineSearch,     // For the search icon
  HiOutlinePencil,      // For the edit/pencil icon
  HiOutlineTrash,       // For the delete/trash icon
  HiOutlineDotsVertical // For the three dots in the card
} from 'react-icons/hi'; // Importing Heroicons

// Reusable Dashboard Card Component - Updated for Tailwind and React Icons
const DashboardCard = ({ title, value, change, isPositive }) => (
  <div className="p-6 rounded-lg shadow-md flex flex-col justify-between bg-card-bg">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-medium text-body-text">{title}</h3>
      {/* Replaced SVG with HiOutlineDotsVertical from react-icons */}
      <HiOutlineDotsVertical
        className="cursor-pointer text-icon-light"
        size={20}
      />
    </div>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-semibold text-header-text">{value}</span>
      <span className={`ml-2 text-sm font-medium ${isPositive ? 'text-chart-positive' : 'text-chart-negative'}`}>
        {isPositive ? '▲' : '▼'} {change}
      </span>
    </div>
    <p className="text-xs mt-2 text-body-text">Last 7 days</p>
  </div>
);

// Main Customer Dashboard Component
const CustomerDashboard = () => {
  // Dummy data for customer dashboard cards
  const [customerStats, setCustomerStats] = useState({
    totalCustomers: { value: '11,040', change: '14.4%', isPositive: true },
    newCustomers: { value: '2,370', change: '20%', isPositive: true },
    visitors: { value: '250k', change: '20%', isPositive: true },
  });

  // Dummy data for customer table
  const [customers, setCustomers] = useState([
    { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orderCount: 35, totalSpend: '3,450.00', status: 'Active' },
    { id: '#CUST002', name: 'Jane Smith', phone: '+1234567891', orderCount: 5, totalSpend: '250.00', status: 'VIP' },
    { id: '#CUST003', name: 'Emily Davis', phone: '+1234567892', orderCount: 30, totalSpend: '4,600.00', status: 'Active' },
    { id: '#CUST004', name: 'Michael Brown', phone: '+1234567893', orderCount: 10, totalSpend: '1,200.00', status: 'Inactive' },
    { id: '#CUST005', name: 'Sarah Wilson', phone: '+1234567894', orderCount: 12, totalSpend: '900.00', status: 'Active' },
    { id: '#CUST006', name: 'David Lee', phone: '+1234567895', orderCount: 8, totalSpend: '2,100.00', status: 'VIP' },
    { id: '#CUST007', name: 'Laura Garcia', phone: '+1234567896', orderCount: 18, totalSpend: '1,200.00', status: 'Inactive' },
    { id: '#CUST008', name: 'James Martinez', phone: '+1234567897', orderCount: 7, totalSpend: '500.00', status: 'Active' },
    { id: '#CUST009', name: 'Olivia Rodriguez', phone: '+1234567898', orderCount: 22, totalSpend: '2,500.00', status: 'VIP' },
    { id: '#CUST010', name: 'William Hernandez', phone: '+1234567899', orderCount: 3, totalSpend: '700.00', status: 'Inactive' },
    { id: '#CUST011', name: 'Sophia Lopez', phone: '+1234567800', orderCount: 15, totalSpend: '1,900.00', status: 'Active' },
    { id: '#CUST012', name: 'Daniel Gonzalez', phone: '+1234567801', orderCount: 28, totalSpend: '3,200.00', status: 'VIP' },
    { id: '#CUST013', name: 'Ava Perez', phone: '+1234567802', orderCount: 6, totalSpend: '1,000.00', status: 'Inactive' },
    { id: '#CUST014', name: 'Matthew Sanchez', phone: '+1234567803', orderCount: 19, totalSpend: '2,300.00', status: 'Active' },
    { id: '#CUST015', name: 'Isabella Rivera', phone: '+1234567804', orderCount: 9, totalSpend: '1,100.00', status: 'VIP' },
  ]);

  const [chartPeriod, setChartPeriod] = useState('Last 7 days'); // This state is not directly used for chart rendering in this component but kept for context.
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Based on the image's visible rows

  // Filtered customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
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
    <div className="min-h-screen p-4 font-inter bg-dashboard-bg">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-header-text">Customer Overview</h1>
      </header>
      <div className="flex flex-col max-w-full lg:flex-row gap-4 pb-2" >
        {/* Top Customer Stats Cards */}
        <div className="w-full md:w-[400px] grid grid-cols-1 gap-4 mb-6">
          <DashboardCard
            title="Total Customers"
            value={customerStats.totalCustomers.value}
            change={customerStats.totalCustomers.change}
            isPositive={customerStats.totalCustomers.isPositive}
          />
          <DashboardCard
            title="New Customers"
            value={customerStats.newCustomers.value}
            change={customerStats.newCustomers.change}
            isPositive={customerStats.newCustomers.isPositive}
          />
          <DashboardCard
            title="Visitors"
            value={customerStats.visitors.value}
            change={customerStats.visitors.change}
            isPositive={customerStats.visitors.isPositive}
          />
        </div>

        {/* Customer Overview Chart Section */}
        <div className="flex-1">
          {/* ReportChart is an external component, assuming it handles its own styling */}
          <ReportChart />
        </div>
      </div>

      {/* Customer Table Section */}
      <div className="bg-card-bg p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-lg font-semibold text-header-text">Customer List</h2>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue border-light-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Replaced SVG with HiOutlineSearch from react-icons */}
            <HiOutlineSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-icon-light"
              size={20}
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <div className="max-w-[300px] lg:min-w-full">
            <table className="min-w-full divide-y divide-light-border">
              <thead className="bg-customer-table-header-bg">
                <tr>
                  {['Customer ID', 'Name', 'Phone', 'Order Count', 'Total Spend', 'Status', 'Actions'].map(header => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-customer-table-header-text"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border bg-card-bg">
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-header-text">{customer.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-body-text">{customer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-body-text">{customer.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-body-text">{customer.orderCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-header-text">${customer.totalSpend}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${customer.status === 'Active' ? 'bg-status-active-bg text-status-active-text' : ''}
                          ${customer.status === 'VIP' ? 'bg-status-vip-bg text-status-vip-text' : ''}
                          ${customer.status === 'Inactive' ? 'bg-status-inactive-bg text-status-inactive-text' : ''}
                        `}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {/* Replaced SVG with HiOutlinePencil from react-icons */}
                          <button className="text-gray-500 hover:text-gray-700" title="Edit">
                            <HiOutlinePencil className="h-5 w-5" />
                          </button>
                          {/* Replaced SVG with HiOutlineTrash from react-icons */}
                          <button className="text-gray-500 hover:text-red-600" title="Delete">
                            <HiOutlineTrash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-body-text">No customers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <span className="text-sm text-body-text mb-4 md:mb-0">
            Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredCustomers.length)}</span> of <span className="font-semibold">{filteredCustomers.length}</span> entries
          </span>
          <nav className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-body-text bg-card-bg border-light-border"
            >
              &larr; Previous
            </button>
            <div className="flex space-x-1">
              {renderPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && paginate(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-md
                    ${typeof page !== 'number' ? 'cursor-default border-transparent bg-transparent hover:bg-transparent' : ''}
                    ${currentPage === page ? 'bg-primary-blue text-white shadow-md border-primary-blue' : 'bg-card-bg text-body-text border-light-border'}
                  `}
                  disabled={typeof page !== 'number'}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-body-text bg-card-bg border-light-border"
            >
              Next &rarr;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;