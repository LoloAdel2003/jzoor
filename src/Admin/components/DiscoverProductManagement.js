import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Common Modal Component for View, Edit, Delete Confirmation
const ProductModal = ({ isOpen, onClose, product, mode, onSave, onDeleteConfirm }) => {
    const [name, setName] = useState(product?.product || '');
    const [price, setPrice] = useState(product?.price || '');
    const [qty, setQty] = useState(product?.qty || '');
    const [status, setStatus] = useState(product?.status || '');

    // Update form fields when product changes (e.g., when editing a new product)
    useEffect(() => {
        if (product) {
            setName(product.product);
            setPrice(product.price);
            setQty(product.qty);
            setStatus(product.status);
        }
    }, [product]);

    if (!isOpen) return null;

    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';
    const isDeleteConfirmMode = mode === 'deleteConfirm';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            onSave({ ...product, product: name, price, qty: parseInt(qty, 10), status });
        }
    };

    // Determine status options based on the table type (seller or stock)
    const statusOptions = product?.tableType === 'seller' ? ['Pending', 'Accepted', 'Rejected'] : ['Available', 'Out of stock'];

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 animate-scaleIn">
                {isDeleteConfirmMode ? (
                    <>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete product "<span className="font-semibold">{product?.product}</span>"? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onDeleteConfirm}
                                className="px-4 py-2 bg-[#dc2626] text-white rounded-md hover:bg-[#b91c1c] transition-colors" // bg-red-600, hover:bg-red-700
                            >
                                Delete
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {isViewMode ? 'Product Details' : 'Edit Product'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Product ID</label>
                                    <input
                                        type="text"
                                        value={product?.id || ''}
                                        readOnly
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        readOnly={isViewMode}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#047857] focus:border-[#047857]" // focus:ring-green-700, focus:border-green-700
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="text"
                                        value={product?.date || ''}
                                        readOnly
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        readOnly={isViewMode}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#047857] focus:border-[#047857]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                        readOnly={isViewMode}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#047857] focus:border-[#047857]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    {isViewMode ? (
                                        <input
                                            type="text"
                                            value={status}
                                            readOnly
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                                        />
                                    ) : (
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#047857] focus:border-[#047857]"
                                            required
                                        >
                                            {statusOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    {isViewMode ? 'Close' : 'Cancel'}
                                </button>
                                {!isViewMode && (
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#047857] text-white rounded-md hover:bg-[#065f46] transition-colors" // bg-green-700, hover:bg-green-800
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </div>
                        </form>
                    </>
                )}
            </div>
            <style>{`
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
};

export function DiscoverProductManagement() {
    const [activeTab, setActiveTab] = useState('All'); // For Seller Products table filter
    const [activeProductTab, setActiveProductTab] = useState('All Product'); // For Stock Products table filter
    const [searchTerm, setSearchTerm] = useState(''); // Unified search term for both tables

    // State for modal management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);
    const [modalMode, setModalMode] = useState(''); // 'view', 'edit', 'deleteConfirm'

    // Dummy data for "Accept Sellers Orders To Add There Products!" table
    const [sellerProducts, setSellerProducts] = useState([
        { no: 1, id: '#DRD0001', product: 'Asphodel', date: '01-01-2025', price: '49.99', qty: 20, status: 'Rejected' },
        { no: 2, id: '#DRD0002', product: 'Product B', date: '01-05-2025', price: '29.00', qty: 15, status: 'Pending' },
        { no: 3, id: '#DRD0003', product: 'Product C', date: '01-10-2025', price: '75.50', qty: 30, status: 'Rejected' },
        { no: 4, id: '#DRD0004', product: 'Product D', date: '01-15-2025', price: '12.25', qty: 5, status: 'Pending' },
        { no: 5, id: '#DRD0005', product: 'Product E', date: '01-20-2025', price: '99.99', qty: 10, status: 'Rejected' },
    ]);

    // Dummy data for "Check And Edit Stock Status" table
    const [stockProducts, setStockProducts] = useState([
        { no: 1, id: '#STK0001', product: 'Gaming Mouse', date: '03-01-2025', price: '55.00', qty: 150, status: 'Available' },
        { no: 2, id: '#STK0002', product: 'Mechanical Keyboard', date: '03-05-2025', price: '120.00', qty: 0, status: 'Out of stock' },
        { no: 3, id: '#STK0003', product: 'USB-C Hub', date: '03-10-2025', price: '35.00', qty: 75, status: 'Available' },
        { no: 4, id: '#STK0004', product: 'Webcam 1080p', date: '03-15-2025', price: '45.00', qty: 0, status: 'Out of stock' },
        { no: 5, id: '#STK0005', product: 'Noise Cancelling Headphones', date: '03-20-2025', price: '199.99', qty: 30, status: 'Available' },
    ]);

    const getStatusClasses = useCallback((status) => {
        switch (status) {
            case 'Rejected':
                return 'bg-[#fee2e2] text-[#dc2626]'; // bg-red-100, text-red-600
            case 'Pending':
                return 'bg-[#fef9c3] text-[#ca8a04]'; // bg-yellow-100, text-yellow-600
            case 'Accepted': // New status for seller table
                return 'bg-[#d1fae5] text-[#065f46]'; // bg-green-100, text-green-700
            case 'Available':
                return 'bg-[#dbeafe] text-[#2563eb]'; // bg-blue-100, text-blue-600
            case 'Out of stock':
                return 'bg-[#fee2e2] text-[#dc2626]'; // same as Rejected
            default:
                return 'bg-[#f3f4f6] text-[#374151]'; // bg-gray-100, text-gray-700
        }
    }, []);

    // Filter and Search Logic for Seller Products
    const filteredAndSearchedSellerProducts = useMemo(() => {
        return sellerProducts.filter(item => {
            const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.status.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTab = (activeTab === 'All') || (item.status === activeTab);
            return matchesSearch && matchesTab;
        });
    }, [sellerProducts, activeTab, searchTerm]);

    // Filter and Search Logic for Stock Products
    const filteredAndSearchedStockProducts = useMemo(() => {
        return stockProducts.filter(item => {
            const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.status.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTab = (activeProductTab === 'All Product') ||
                               (activeProductTab === 'Out of Stock' && item.status === 'Out of stock') ||
                               (activeProductTab === 'Available' && item.status === 'Available') ||
                               (activeProductTab === 'On Sale' && false); // 'On Sale' is a placeholder as no data for it
            return matchesSearch && matchesTab;
        });
    }, [stockProducts, activeProductTab, searchTerm]);

    // Pagination Logic
    const itemsPerPage = 10;
    const [currentPageSeller, setCurrentPageSeller] = useState(1);
    const [currentPageStock, setCurrentPageStock] = useState(1);

    const totalPagesSeller = Math.ceil(filteredAndSearchedSellerProducts.length / itemsPerPage);
    const currentSellerProducts = filteredAndSearchedSellerProducts.slice(
        (currentPageSeller - 1) * itemsPerPage,
        currentPageSeller * itemsPerPage
    );

    const totalPagesStock = Math.ceil(filteredAndSearchedStockProducts.length / itemsPerPage);
    const currentStockProducts = filteredAndSearchedStockProducts.slice(
        (currentPageStock - 1) * itemsPerPage,
        currentPageStock * itemsPerPage
    );

    const renderPaginationButtons = useCallback((totalPages, currentPage, setCurrentPage) => {
        const pages = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

        if (endPage - startPage + 1 < maxPagesToShow) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, maxPagesToShow);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, totalPages - maxPagesToShow + 1);
            }
        }

        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === 1 ? 'bg-[#047857] text-white' : 'text-gray-700 hover:bg-gray-100'}`} // bg-green-700
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="ellipsis-start" className="px-1 py-2 text-gray-700 text-sm">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === i ? 'bg-[#047857] text-white' : 'text-gray-700 hover:bg-gray-100'}`} // bg-green-700
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="ellipsis-end" className="px-1 py-2 text-gray-700 text-sm">...</span>);
            }
            pages.push(
                <button
                    key={totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'bg-[#047857] text-white' : 'text-gray-700 hover:bg-gray-100'}`} // bg-green-700
                    onClick={() => setCurrentPage(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }
        return pages;
    }, []);

    // Handlers for modal actions
    const handleViewProduct = useCallback((product, tableType) => {
        setModalProduct({ ...product, tableType });
        setModalMode('view');
        setIsModalOpen(true);
    }, []);

    const handleEditProduct = useCallback((product, tableType) => {
        setModalProduct({ ...product, tableType });
        setModalMode('edit');
        setIsModalOpen(true);
    }, []);

    const handleDeleteProductClick = useCallback((product, tableType) => {
        setModalProduct({ ...product, tableType });
        setModalMode('deleteConfirm');
        setIsModalOpen(true);
    }, []);

    const confirmDeleteProduct = useCallback(() => {
        if (modalProduct.tableType === 'seller') {
            setSellerProducts(prev => prev.filter(p => p.id !== modalProduct.id));
            if (currentSellerProducts.length === 1 && currentPageSeller > 1) {
                setCurrentPageSeller(prev => prev - 1);
            }
        } else if (modalProduct.tableType === 'stock') {
            setStockProducts(prev => prev.filter(p => p.id !== modalProduct.id));
            if (currentStockProducts.length === 1 && currentPageStock > 1) {
                setCurrentPageStock(prev => prev - 1);
            }
        }
        setIsModalOpen(false);
        setModalProduct(null);
    }, [modalProduct, currentSellerProducts.length, currentPageSeller, currentStockProducts.length, currentPageStock]);

    const handleSaveProduct = useCallback((updatedProduct) => {
        if (updatedProduct.tableType === 'seller') {
            if (updatedProduct.status === 'Accepted') {
                // Remove from seller products
                setSellerProducts(prev => prev.filter(p => p.id !== updatedProduct.id));
                // Add to stock products with 'Available' status
                setStockProducts(prev => [
                    ...prev,
                    { ...updatedProduct, status: 'Available', no: prev.length + 1 } // Assign a new 'no'
                ]);
            } else {
                setSellerProducts(prev =>
                    prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
                );
            }
        } else if (updatedProduct.tableType === 'stock') {
            setStockProducts(prev =>
                prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
            );
        }
        setIsModalOpen(false);
        setModalProduct(null);
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm font-sans w-full min-h-screen">
            <div className="flex justify-end items-center mb-6 flex-wrap gap-4">
                <Link to="/admin/addProduct" className="no-underline flex items-center px-5 py-2 bg-[#047857] text-white rounded-lg text-base font-medium hover:bg-[#065f46] transition-colors shadow-md"> {/* bg-green-700, hover:bg-green-800 */}
                    <FaPlus className="w-5 h-5 mr-2" />
                    Add New Product
                </Link>
            </div>

            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Search for product ID, name, or status..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#047857] text-sm shadow-sm" // focus:ring-green-700
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPageSeller(1);
                        setCurrentPageStock(1);
                    }}
                />
                <FaSearch className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Seller Products Section */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-5">Accept Sellers Orders To Add Their Products!</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'All' ? 'bg-[#047857] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // bg-green-700
                        onClick={() => { setActiveTab('All'); setCurrentPageSeller(1); }}
                    >
                        All ({sellerProducts.length})
                    </button>
                    <button
                        className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'Pending' ? 'bg-[#047857] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // bg-green-700
                        onClick={() => { setActiveTab('Pending'); setCurrentPageSeller(1); }}
                    >
                        Pending ({sellerProducts.filter(item => item.status === 'Pending').length})
                    </button>
                    <button
                        className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'Rejected' ? 'bg-[#047857] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // bg-green-700
                        onClick={() => { setActiveTab('Rejected'); setCurrentPageSeller(1); }}
                    >
                        Rejected ({sellerProducts.filter(item => item.status === 'Rejected').length})
                    </button>
                    <button
                        className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'Accepted' ? 'bg-[#047857] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // Added 'Accepted' filter for Seller Products
                        onClick={() => { setActiveTab('Accepted'); setCurrentPageSeller(1); }}
                    >
                        Accepted ({sellerProducts.filter(item => item.status === 'Accepted').length})
                    </button>
                </div>

                <div className="w-full overflow-x-auto lg:overflow-x-visible rounded-lg shadow-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#F0FDF4]">
                            <tr>
                                {['No.', 'Product Id', 'Product Name', 'Date', 'Price', 'QTY', 'Status', 'Action'].map(header => (
                                    <th
                                        key={header}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#065F46]"
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
                                                <button
                                                    className="text-gray-500 hover:text-[#2563eb] transition-colors" // hover:text-blue-600
                                                    title="View Details"
                                                    onClick={() => handleViewProduct(item, 'seller')}
                                                >
                                                    <FaEye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="text-gray-500 hover:text-[#ca8a04] transition-colors" // hover:text-yellow-600
                                                    title="Edit"
                                                    onClick={() => handleEditProduct(item, 'seller')}
                                                >
                                                    <FaEdit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="text-gray-500 hover:text-[#dc2626] transition-colors" // hover:text-red-600
                                                    title="Delete"
                                                    onClick={() => handleDeleteProductClick(item, 'seller')}
                                                >
                                                    <FaTrash className="w-5 h-5" />
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

                <div className="flex justify-between items-center flex-wrap gap-3 py-3 mt-4">
                    <button
                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                        onClick={() => setCurrentPageSeller(prev => Math.max(1, prev - 1))}
                        disabled={currentPageSeller === 1}
                    >
                        <IoIosArrowBack className="h-4 w-4 mr-1" />
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
                        <IoIosArrowForward className="h-4 w-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* Stock Products Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-5">Check And Edit Stock Status</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeProductTab === 'All Product' ? 'bg-[#047857] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // bg-green-700
                        onClick={() => { setActiveProductTab('All Product'); setCurrentPageStock(1); }}
                    >
                        All Products ({stockProducts.length})
                    </button>
                    <button
                        className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeProductTab === 'Available' ? 'bg-[#047857] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // bg-green-700
                        onClick={() => { setActiveProductTab('Available'); setCurrentPageStock(1); }}
                    >
                        Available ({stockProducts.filter(item => item.status === 'Available').length})
                    </button>
                    <button
                        className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeProductTab === 'On Sale' ? 'bg-[#047857] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // bg-green-700
                        onClick={() => { setActiveProductTab('On Sale'); setCurrentPageStock(1); }}
                    >
                        On Sale
                    </button>
                    <button
                        className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeProductTab === 'Out of Stock' ? 'bg-[#047857] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // bg-green-700
                        onClick={() => { setActiveProductTab('Out of Stock'); setCurrentPageStock(1); }}
                    >
                        Out of Stock ({stockProducts.filter(item => item.status === 'Out of stock').length})
                    </button>
                    <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                        onClick={() => { /* Implement logic to filter for "My Products" if user context is available */ }}
                    >
                        Show Only My Products
                    </button>
                </div>

                <div className="w-full overflow-x-auto lg:overflow-x-visible rounded-lg shadow-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#F0FDF4]">
                            <tr>
                                {['No.', 'Product Id', 'Product Name', 'Date', 'Price', 'QTY', 'Status', 'Action'].map(header => (
                                    <th
                                        key={header}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#065F46]"
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
                                                <button
                                                    className="text-gray-500 hover:text-[#2563eb] transition-colors" // hover:text-blue-600
                                                    title="View Details"
                                                    onClick={() => handleViewProduct(item, 'stock')}
                                                >
                                                    <FaEye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="text-gray-500 hover:text-[#ca8a04] transition-colors" // hover:text-yellow-600
                                                    title="Edit"
                                                    onClick={() => handleEditProduct(item, 'stock')}
                                                >
                                                    <FaEdit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="text-gray-500 hover:text-[#dc2626] transition-colors" // hover:text-red-600
                                                    title="Delete"
                                                    onClick={() => handleDeleteProductClick(item, 'stock')}
                                                >
                                                    <FaTrash className="w-5 h-5" />
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

                <div className="flex justify-between items-center mt-6 flex-wrap gap-3 py-3">
                    <button
                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                        onClick={() => setCurrentPageStock(prev => Math.max(1, prev - 1))}
                        disabled={currentPageStock === 1}
                    >
                        <IoIosArrowBack className="h-4 w-4 mr-1" />
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
                        <IoIosArrowForward className="h-4 w-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* Render Product Modal */}
            {isModalOpen && (
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={modalProduct}
                    mode={modalMode}
                    onSave={handleSaveProduct}
                    onDeleteConfirm={confirmDeleteProduct}
                />
            )}
        </div>
    );
}

export default DiscoverProductManagement;