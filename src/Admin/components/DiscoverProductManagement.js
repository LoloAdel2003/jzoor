import React, { useState } from 'react';

export function DiscoverProductManagement() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeProductTab, setActiveProductTab] = useState('All Product');

  // Dummy data for "Accept Sellers Orders To Add There Products!" table
  const sellerProducts = [
    {
      no: 1,
      id: '#DRD0001',
      image: 'https://via.placeholder.com/30', // Replace with actual image
      product: 'Asphodel',
      date: '01-01-2025',
      price: '49.99',
      qty: 20,
      status: 'Rejected', // Possible values: 'Rejected', 'Pending'
    },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Pending' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Rejected' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Pending' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Rejected' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Pending' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Rejected' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Pending' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Rejected' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Pending' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Rejected' },
    { no: 1, id: '#DRD0001', image: 'https://via.placeholder.com/30', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Pending' },
  ];

  // Dummy data for "Check And Edit Stock Status" table
  const stockProducts = [
    {
      no: 1,
      id: '#DRD0001',
      image: 'https://via.placeholder.com/30', // Replace with actual image
      product: 'Asphodel',
      date: '01-01-2025',
      price: '49.99',
      qty: 20,
      status: 'Available', // Possible values: 'Available', 'Out of stock'
    },
    // Add more dummy data as needed to fill the table for demonstration
  ];

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Available':
        return 'bg-green text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm font-sans max-w-7xl mx-auto my-8">
      {/* Header: Discover */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Discover</h1>
        <button className="flex items-center px-4 py-2 bg-green text-white rounded-md text-sm font-medium hover:bg-green-hover transition-colors">
          New Product
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for id, name, product"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green text-sm"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Accept Sellers Orders To Add There Products! Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Accept Sellers Orders To Add There Products!</h2>
        <div className="flex space-x-3 mb-4">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'All' ? 'bg-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('All')}
          >
            All (20XX)
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'Pending' ? 'bg-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('Pending')}
          >
            Pending (360)
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'Rejected' ? 'bg-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('Rejected')}
          >
            Rejected
          </button>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 mb-4">
          Show Only My Products
        </button>

        {/* Table 1 */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-hover">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Product Id</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">QTY</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sellerProducts.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.no}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <img src={item.image} alt={item.product} className="w-8 h-8 rounded-full object-cover mr-3" /> */}
                      <span className="text-sm font-medium text-gray-900">{item.product}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.qty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M16.5 3.75V7.5a.75.75 0 0 1-.75.75h-3.75a.75.75 0 0 1-.75-.75V3.75m-3 0V7.5a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V3.75M6.75 3.75H4.875c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h14.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H16.5" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination for Table 1 */}
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Previous
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green text-white rounded-lg">1</button>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">2</button>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">3</button>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">4</button>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">5</button>
            <span className="px-4 py-2 text-gray-700">--</span>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">24</button>
          </div>
          <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Check And Edit Stock Status Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Check And Edit Stock Status</h2>
        <div className="flex space-x-3 mb-4">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeProductTab === 'All Product' ? 'bg-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveProductTab('All Product')}
          >
            All Product (145)
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeProductTab === 'Featured Products' ? 'bg-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveProductTab('Featured Products')}
          >
            Featured Products
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeProductTab === 'On Sale' ? 'bg-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveProductTab('On Sale')}
          >
            On Sale
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeProductTab === 'Out of Stock' ? 'bg-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveProductTab('Out of Stock')}
          >
            Out of Stock
          </button>
        </div>

        {/* Table 2 */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-hover">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Product Id</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">QTY</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockProducts.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.no}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <img src={item.image} alt={item.product} className="w-8 h-8 rounded-full object-cover mr-3" /> */}
                      <span className="text-sm font-medium text-gray-900">{item.product}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.qty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M16.5 3.75V7.5a.75.75 0 0 1-.75.75h-3.75a.75.75 0 0 1-.75-.75V3.75m-3 0V7.5a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V3.75M6.75 3.75H4.875c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h14.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H16.5" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination for Table 1 */}
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Previous
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green text-white rounded-lg">1</button>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">2</button>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">3</button>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">4</button>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">5</button>
            <span className="px-4 py-2 text-gray-700">--</span>
            <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">24</button>
          </div>
          <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
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