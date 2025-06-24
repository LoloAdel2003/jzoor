import React, { useState, useMemo, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Font Awesome icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'; // iOS style arrows for pagination

export function DiscoverCategories() {
  // Dummy data for categories
  const initialCategories = [
    {
      id: 1,
      image: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=F', // Example color for flowers
      category: 'Flowers',
      description: 'Fresh & dried flower picks',
      noProducts: 7000,
    },
    {
      id: 2,
      image: 'https://placehold.co/40x40/10B981/FFFFFF?text=P', // Example color for plants
      category: 'Plants',
      description: 'Indoor & outdoor greenery',
      noProducts: 5000,
    },
    {
      id: 3,
      image: 'https://placehold.co/40x40/EF4444/FFFFFF?text=G', // Example color for gifts
      category: 'Gifts',
      description: 'Plant-based gift sets',
      noProducts: 3500,
    },
    {
      id: 4,
      image: 'https://placehold.co/40x40/6366F1/FFFFFF?text=O', // Example color for pots
      category: 'Pots',
      description: 'Decorative plant containers',
      noProducts: 1000,
    },
    {
      id: 5,
      image: 'https://placehold.co/40x40/06B6D4/FFFFFF?text=C', // Example color for care
      category: 'Care',
      description: 'Tools & essentials for care',
      noProducts: 5000,
    },
    {
      id: 6,
      image: 'https://placehold.co/40x40/8B5CF6/FFFFFF?text=A', // Example color for accessories
      category: 'Accessory',
      description: 'Stands, tags & add-ons',
      noProducts: 4200,
    },
    {
      id: 7,
      image: 'https://placehold.co/40x40/EC4899/FFFFFF?text=S',
      category: 'Seeds',
      description: 'Variety of plant seeds',
      noProducts: 1500,
    },
    {
      id: 8,
      image: 'https://placehold.co/40x40/FCD34D/000000?text=T',
      category: 'Tools',
      description: 'Gardening tools',
      noProducts: 2000,
    },
    {
      id: 9,
      image: 'https://placehold.co/40x40/A78BFA/FFFFFF?text=B',
      category: 'Books',
      description: 'Gardening books & guides',
      noProducts: 800,
    },
    {
      id: 10,
      image: 'https://placehold.co/40x40/4F46E5/FFFFFF?text=D',
      category: 'Decor',
      description: 'Garden & home decor',
      noProducts: 2500,
    },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Setting to 5 rows as seen in typical dashboards

  // State for Add/Edit Category Modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Stores the category being edited
  const [modalCategoryName, setModalCategoryName] = useState('');
  const [modalCategoryDescription, setModalCategoryDescription] = useState('');
  const [modalCategoryNoProducts, setModalCategoryNoProducts] = useState('');
  const [modalCategoryImage, setModalCategoryImage] = useState(''); // For image URL input

  // Filtered categories based on search term
  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Reset page to 1 whenever search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handlers for pagination buttons
  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  // Function to render page numbers for pagination control
  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Show all pages if total pages are 5 or less
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Add ellipsis if current page is far from the start
      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      // Show current page and its neighbors
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pageNumbers.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(currentPage + 1);
      }

      // Add ellipsis if current page is far from the end
      if (currentPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      // Always show last page if it's not already included
      if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }
    // Filter out duplicate page numbers that might appear due to logic overlap
    return pageNumbers.filter((value, index, self) => self.indexOf(value) === index);
  };

  // Handler for opening the Add/Edit Category modal
  const openCategoryModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      setModalCategoryName(category.category);
      setModalCategoryDescription(category.description);
      setModalCategoryNoProducts(category.noProducts.toString());
      setModalCategoryImage(category.image);
    } else {
      setModalCategoryName('');
      setModalCategoryDescription('');
      setModalCategoryNoProducts('');
      setModalCategoryImage('');
    }
    setShowCategoryModal(true);
  };

  // Handler for closing the Add/Edit Category modal
  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategory(null); // Clear editing state
  };

  // Handler for saving (adding or updating) a category
  const handleSaveCategory = () => {
    if (!modalCategoryName || !modalCategoryDescription || !modalCategoryNoProducts) {
      // Using a simple alert for brevity, but a custom modal would be better.
      alert('Please fill in all required fields (Category Name, Description, No. Products).');
      return;
    }

    const categoryData = {
      category: modalCategoryName,
      description: modalCategoryDescription,
      noProducts: parseInt(modalCategoryNoProducts, 10),
      image: modalCategoryImage || `https://placehold.co/40x40/CCCCCC/000000?text=${modalCategoryName.charAt(0).toUpperCase()}`,
    };

    if (editingCategory) {
      // Update existing category
      setCategories(prevCategories =>
        prevCategories.map(cat =>
          cat.id === editingCategory.id ? { ...cat, ...categoryData } : cat
        )
      );
    } else {
      // Add new category
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      setCategories(prevCategories => [...prevCategories, { id: newId, ...categoryData }]);
    }
    closeCategoryModal(); // Close modal after saving
  };

  // Handler for deleting a category
  const handleDeleteCategory = (id) => {
    // Using a simple confirm for brevity, but a custom modal would be better.
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prevCategories => prevCategories.filter(cat => cat.id !== id));
      // Reset current page if all items on the current page are deleted
      if (currentCategories.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    }
  };

  return (
    <div className="p-4 w-full min-h-screen" style={{ backgroundColor: '#F3F4F6' }}>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Discover</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 font-sans mx-auto my-8">
        {/* Search and Add Category Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search your category"
              className="w-full pl-10 pr-4 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => openCategoryModal()} // Open modal for adding
            className="flex items-center px-4 py-2 bg-[#047857] hover:bg-[#026b4d] text-white rounded-md text-sm font-medium transition-colors"
          >
            <FaPlus className="h-5 w-5 mr-2" />
            Add Category
          </button>
        </div>

        {/* Categories Table */}
        <div className="w-full overflow-x-auto lg:overflow-x-visible" style={{ borderColor: '#E5E7EB', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <div className="max-w-[300px] lg:min-w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead style={{ backgroundColor: '#F0FDF4' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No.</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NO. Products</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCategories.length > 0 ? (
                  currentCategories.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded mr-3 focus:ring-blue-500" />
                          <span className="text-sm text-gray-700">{item.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* Using the image from data, or placeholder if not provided */}
                          {item.image && <img src={item.image} alt={item.category} className="w-8 h-8 rounded-full mr-3 object-cover"/>}
                          <span className="text-sm font-medium text-gray-900">{item.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.noProducts.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            className="text-gray-500 hover:text-blue-600"
                            title="Edit"
                            onClick={() => openCategoryModal(item)} // Open modal for editing with item data
                          >
                            <FaEdit className="w-5 h-5" />
                          </button>
                          <button
                            className="text-gray-500 hover:text-red" // Added hover:text-red-600
                            title="Delete"
                            onClick={() => handleDeleteCategory(item.id)} // Delete functionality
                          >
                            <FaTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No categories found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <span className="text-sm text-gray-700 mb-4 md:mb-0">
            Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredCategories.length)}</span> of <span className="font-semibold">{filteredCategories.length}</span> entries
          </span>
          <nav className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 bg-white hover:bg-gray-50"
            >
              <IoIosArrowBack className="h-4 w-4 mr-1" />
              Previous
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
                    backgroundColor: currentPage === page ? '#2563EB' : '#FFFFFF',
                    color: currentPage === page ? '#FFFFFF' : '#4B5563',
                    borderColor: currentPage === page ? '#2563EB' : '#D1D5DB',
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
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 bg-white hover:bg-gray-50"
            >
              Next <IoIosArrowForward className="h-4 w-4 ml-1" />
            </button>
          </nav>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveCategory(); }}>
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="categoryName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={modalCategoryName}
                  onChange={(e) => setModalCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="categoryDescription"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={modalCategoryDescription}
                  onChange={(e) => setModalCategoryDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="noProducts" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Products<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="noProducts"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={modalCategoryNoProducts}
                  onChange={(e) => setModalCategoryNoProducts(e.target.value)} // Corrected setter function
                  required
                  min="0"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url" // Use type="url" for image URLs
                  id="categoryImage"
                  placeholder="e.g., https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={modalCategoryImage}
                  onChange={(e) => setModalCategoryImage(e.target.value)}
                />
                {modalCategoryImage && (
                    <img src={modalCategoryImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-md border border-gray-200" onError={(e) => e.target.src='https://placehold.co/40x40/CCCCCC/000000?text=Error'} />
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeCategoryModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#047857] text-white rounded-md hover:bg-[#026b4d] transition-colors"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiscoverCategories;
