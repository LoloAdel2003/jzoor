import React from 'react';

export function DiscoverCategories() {
  const categories = [
    {
      no: 1,
      image: 'https://via.placeholder.com/40',
      category: 'Flowers',
      description: 'Fresh & dried flower picks',
      noProducts: 7000,
    },
    {
      no: 2,
      image: 'https://via.placeholder.com/40',
      category: 'Plants',
      description: 'Indoor & outdoor greenery',
      noProducts: 5000,
    },
    {
      no: 3,
      image: 'https://via.placeholder.com/40',
      category: 'Gifts',
      description: 'Plant-based gift sets',
      noProducts: 3500,
    },
    {
      no: 4,
      image: 'https://via.placeholder.com/40',
      category: 'Pots',
      description: 'Decorative plant containers',
      noProducts: 1000,
    },
    {
      no: 5,
      image: 'https://via.placeholder.com/40',
      category: 'Care',
      description: 'Tools & essentials for care',
      noProducts: 5000,
    },
    {
      no: 6,
      image: 'https://via.placeholder.com/40',
      category: 'Accessory',
      description: 'Stands, tags & add-ons',
      noProducts: 4200,
    },
  ];

  return (
    <div className="p-4 w-full ">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Discover</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 font-sans mx-auto my-8">
        {/* Search and Add Category */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search your product"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green text-sm"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="flex items-center px-4 py-2 bg-green hover:bg-green-hover text-white rounded-md text-sm font-medium hover:bg-green-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Category
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-50">
              <tr className="bg-green-hover">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">NO. Products</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600 rounded mr-3" />
                      <span className="text-sm text-gray-700">{item.no}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.noProducts}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21a48.108 48.108 0 0 0-3.478-.397m-12 .562L4.772 5.79M16.5 3.75V7.5M6.75 3.75H4.875C4.254 3.75 3.75 4.254 3.75 4.875v12.75c0 .621.504 1.125 1.125 1.125h14.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H16.5" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Previous
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">1</button>
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

export default DiscoverCategories;
