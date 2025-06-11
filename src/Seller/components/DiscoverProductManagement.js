import React, { useState } from 'react';

export function DiscoverProductManagement() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeProductTab, setActiveProductTab] = useState('All Product');

  // Dummy data for "Accept Sellers Orders To Add There Products!" table
  const sellerProducts = [
    {
      no: 1,
      id: '#DRD0001',
      product: 'Asphodel',
      date: '01-01-2025',
      price: '49.99',
      qty: 20,
      status: 'Rejected', // Possible values: 'Rejected', 'Pending'
    },
    { no: 2, id: '#DRD0002', product: 'Product B', date: '01-05-2025', price: '29.00', qty: 15, status: 'Pending' },
    { no: 3, id: '#DRD0003', product: 'Product C', date: '01-10-2025', price: '75.50', qty: 30, status: 'Rejected' },
    { no: 4, id: '#DRD0004', product: 'Product D', date: '01-15-2025', price: '12.25', qty: 5, status: 'Pending' },
    { no: 5, id: '#DRD0005', product: 'Product E', date: '01-20-2025', price: '99.99', qty: 10, status: 'Rejected' },
    { no: 6, id: '#DRD0006', product: 'Product F', date: '01-25-2025', price: '5.75', qty: 50, status: 'Pending' },
    { no: 7, id: '#DRD0007', product: 'Product G', date: '01-30-2025', price: '60.00', qty: 22, status: 'Rejected' },
    { no: 8, id: '#DRD0008', product: 'Product H', date: '02-01-2025', price: '19.99', qty: 18, status: 'Pending' },
    { no: 9, id: '#DRD0009', product: 'Product I', date: '02-05-2025', price: '88.00', qty: 7, status: 'Rejected' },
    { no: 10, id: '#DRD0010', product: 'Product J', date: '02-10-2025', price: '34.50', qty: 25, status: 'Pending' },
    { no: 11, id: '#DRD0011', product: 'Product K', date: '02-15-2025', price: '14.00', qty: 12, status: 'Rejected' },
    { no: 12, id: '#DRD0012', product: 'Product L', date: '02-20-2025', price: '7.99', qty: 40, status: 'Pending' },
    { no: 13, id: '#DRD0013', product: 'Product M', date: '02-25-2025', price: '50.00', qty: 10, status: 'Pending' },
    { no: 14, id: '#DRD0014', product: 'Product N', date: '03-01-2025', price: '25.00', qty: 5, status: 'Rejected' },
    { no: 15, id: '#DRD0015', product: 'Product O', date: '03-05-2025', price: '70.00', qty: 18, status: 'Pending' },
    { no: 16, id: '#DRD0016', product: 'Product P', date: '03-10-2025', price: '10.00', qty: 30, status: 'Rejected' },
  ];

  // Dummy data for "Check And Edit Stock Status" table
  const stockProducts = [
    {
      no: 1,
      id: '#STK0001',
      product: 'Gaming Mouse',
      date: '03-01-2025',
      price: '55.00',
      qty: 150,
      status: 'Available', // Possible values: 'Available', 'Out of stock'
    },
    { no: 2, id: '#STK0002', product: 'Mechanical Keyboard', date: '03-05-2025', price: '120.00', qty: 0, status: 'Out of stock' },
    { no: 3, id: '#STK0003', product: 'USB-C Hub', date: '03-10-2025', price: '35.00', qty: 75, status: 'Available' },
    { no: 4, id: '#STK0004', product: 'Webcam 1080p', date: '03-15-2025', price: '45.00', qty: 0, status: 'Out of stock' },
    { no: 5, id: '#STK0005', product: 'Noise Cancelling Headphones', date: '03-20-2025', price: '199.99', qty: 30, status: 'Available' },
    { no: 6, id: '#STK0006', product: 'Portable SSD 1TB', date: '03-25-2025', price: '89.99', qty: 100, status: 'Available' },
    { no: 7, id: '#STK0007', product: 'Ergonomic Chair', date: '03-30-2025', price: '250.00', qty: 0, status: 'Out of stock' },
    { no: 8, id: '#STK0008', product: 'Monitor 27-inch', date: '04-01-2025', price: '299.00', qty: 20, status: 'Available' },
    { no: 9, id: '#STK0009', product: 'Smart Speaker', date: '04-05-2025', price: '70.00', qty: 0, status: 'Out of stock' },
    { no: 10, id: '#STK0010', product: 'Fitness Tracker', date: '04-10-2025', price: '60.00', qty: 90, status: 'Available' },
    { no: 11, id: '#STK0011', product: 'Graphics Card', date: '04-15-2025', price: '300.00', qty: 10, status: 'Available' },
    { no: 12, id: '#STK0012', product: 'CPU Cooler', date: '04-20-2025', price: '70.00', qty: 0, status: 'Out of stock' },
  ];

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Available':
        return 'bg-blue-100 text-blue-600';
      case 'Out of stock':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Pagination Logic (for both tables)
  const itemsPerPage = 10;

  const [currentPageSeller, setCurrentPageSeller] = useState(1);
  const [currentPageStock, setCurrentPageStock] = useState(1);

  const filteredSellerProducts = sellerProducts.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  const filteredStockProducts = stockProducts.filter(item => {
    if (activeProductTab === 'All Product') return true;
    if (activeProductTab === 'Out of Stock') return item.status === 'Out of stock';
    // Add logic for 'Featured Products' and 'On Sale' if needed based on your data structure
    return true; // Default for other tabs if no specific filter
  });

  const totalPagesSeller = Math.ceil(filteredSellerProducts.length / itemsPerPage);
  const currentSellerProducts = filteredSellerProducts.slice(
    (currentPageSeller - 1) * itemsPerPage,
    currentPageSeller * itemsPerPage
  );

  const totalPagesStock = Math.ceil(filteredStockProducts.length / itemsPerPage);
  const currentStockProducts = filteredStockProducts.slice(
    (currentPageStock - 1) * itemsPerPage,
    currentPageStock * itemsPerPage
  );

  const renderPaginationButtons = (totalPages, currentPage, setCurrentPage) => {
    const pages = [];
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
      pages.push(
        <button
          key={1}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === 1 ? 'bg-[rgb(4,120,87)] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis-start" className="px-4 py-2 text-gray-700 text-sm">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === i ? 'bg-[rgb(4,120,87)] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis-end" className="px-4 py-2 text-gray-700 text-sm">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'bg-[rgb(4,120,87)] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm font-sans max-w-7xl mx-auto my-8">
      <div className="flex justify-end items-center mb-6 flex-wrap gap-4">
        <button className="flex items-center px-5 py-2 bg-[rgb(4,120,87)] text-white rounded-lg text-base font-medium hover:bg-green-700 transition-colors shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Product
        </button>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for product ID, name, or status..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(4,120,87)] text-sm shadow-sm"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Seller Products Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Accept Sellers Orders To Add Their Products!</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'All' ? 'bg-[rgb(4,120,87)] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => { setActiveTab('All'); setCurrentPageSeller(1); }}
          >
            All ({sellerProducts.length})
          </button>
          <button
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'Pending' ? 'bg-[rgb(4,120,87)] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => { setActiveTab('Pending'); setCurrentPageSeller(1); }}
          >
            Pending ({sellerProducts.filter(item => item.status === 'Pending').length})
          </button>
          <button
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'Rejected' ? 'bg-[rgb(4,120,87)] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => { setActiveTab('Rejected'); setCurrentPageSeller(1); }}
          >
            Rejected ({sellerProducts.filter(item => item.status === 'Rejected').length})
          </button>
          <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Show Only My Products
          </button>
        </div>

        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <div className="max-w-[300px] lg:min-w-full ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F0FDF4]"> 
                <tr>
                  {['No.', 'Product Id', 'Product Name', 'Date', 'Price', 'QTY', 'Status', 'Action'].map(header => (
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
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSellerProducts.length > 0 ? (
                  currentSellerProducts.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{(currentPageSeller - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{item.product}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.qty}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button className="text-gray-500 hover:text-[rgb(4,120,87)]" title="Add">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-[rgb(4,120,87)]" title="View Details">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-[rgb(4,120,87)]" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-red-600" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M16.5 3.75V7.5a.75.75 0 0 1-.75.75h-3.75a.75.75 0 0 1-.75-.75V3.75m-3 0V7.5a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V3.75M6.75 3.75H4.875c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h14.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H16.5" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-base text-gray-500 text-center">No seller products found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-3 py-3">
          <button
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            onClick={() => setCurrentPageSeller(prev => Math.max(1, prev - 1))}
            disabled={currentPageSeller === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Previous
          </button>
          <div className="flex space-x-2 flex-wrap justify-center">
            {renderPaginationButtons(totalPagesSeller, currentPageSeller, setCurrentPageSeller)}
          </div>
          <button
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            onClick={() => setCurrentPageSeller(prev => Math.min(totalPagesSeller, prev + 1))}
            disabled={currentPageSeller === totalPagesSeller}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stock Products Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Check And Edit Stock Status</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeProductTab === 'All Product' ? 'bg-[rgb(4,120,87)] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => { setActiveProductTab('All Product'); setCurrentPageStock(1); }}
          >
            All Products ({stockProducts.length})
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeProductTab === 'Featured Products' ? 'bg-[rgb(4,120,87)] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => { setActiveProductTab('Featured Products'); setCurrentPageStock(1); }}
          >
            Featured Products
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeProductTab === 'On Sale' ? 'bg-[rgb(4,120,87)] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => { setActiveProductTab('On Sale'); setCurrentPageStock(1); }}
          >
            On Sale
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeProductTab === 'Out of Stock' ? 'bg-[rgb(4,120,87)] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => { setActiveProductTab('Out of Stock'); setCurrentPageStock(1); }}
          >
            Out of Stock ({stockProducts.filter(item => item.status === 'Out of stock').length})
          </button>
        </div>

        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <div className="max-w-[300px] lg:min-w-full ">
            <table className="min-w-full divide-y divide-gray-200" style={{ borderColor: '#E5E7EB' }}>
              <thead className="bg-[#F0FDF4]"> {/* Header background color */}
                <tr>
                  {['No.', 'Product Id', 'Product Name', 'Date', 'Price', 'QTY', 'Status', 'Action'].map(header => (
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
              <tbody className="bg-white divide-y divide-gray-200">
                {currentStockProducts.length > 0 ? (
                  currentStockProducts.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{(currentPageStock - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{item.product}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.qty}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button className="text-gray-500 hover:text-[rgb(4,120,87)]" title="Add">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-[rgb(4,120,87)]" title="View Details">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-[rgb(4,120,87)]" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-red-600" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M16.5 3.75V7.5a.75.75 0 0 1-.75.75h-3.75a.75.75 0 0 1-.75-.75V3.75m-3 0V7.5a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V3.75M6.75 3.75H4.875c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h14.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H16.5" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-base text-gray-500 text-center">No stock products found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 flex-wrap gap-3 py-3">
          <button
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            onClick={() => setCurrentPageStock(prev => Math.max(1, prev - 1))}
            disabled={currentPageStock === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Previous
          </button>
          <div className="flex space-x-2 flex-wrap justify-center">
            {renderPaginationButtons(totalPagesStock, currentPageStock, setCurrentPageStock)}
          </div>
          <button
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            onClick={() => setCurrentPageStock(prev => Math.min(totalPagesStock, prev + 1))}
            disabled={currentPageStock === totalPagesStock}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscoverProductManagement;