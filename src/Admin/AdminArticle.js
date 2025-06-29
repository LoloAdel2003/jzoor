import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  HiDotsVertical,
  HiArrowNarrowUp,
  HiPlus,
  HiSearch,
  HiEye,
  HiPencil,
  HiTrash,
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiX,
  HiArrowRight,
  HiDotsHorizontal,
  HiClock,
  HiArchiveBox,
  HiCheckCircle,
  HiXCircle,
  HiChevronDown,
} from 'react-icons/hi';

import { FaTruck, FaCube } from 'react-icons/fa';




// Title component definition (as it was in the original context)
const Title = ({ title }) => <h1 className="text-3xl font-bold text-[#1F2937] mb-6 md:mb-0">{title}</h1>;

export function ArticlesOverview() {
  const [activeReviewsFilter, setActiveReviewsFilter] = useState('All Articles');
  const [activeTimeframe, setActiveTimeframe] = useState('This week');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // State for modals
  const [showArticleDetailsModal, setShowArticleDetailsModal] = useState(false);
  const [showEditArticleStatusModal, setShowEditArticleStatusModal] = useState(false);
  const [showDeleteArticleConfirmationModal, setShowDeleteArticleConfirmationModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newArticleStatus, setNewArticleStatus] = useState('');

  const articlesOverview = {
    mostViewedArticle: "Olive Tree Care",
    totalArticles: 400,
    totalArticlesChange: "+20%",
    averageReadingTime: 3, // in minutes
    averageReadingTimeChange: "+20%",
  };

  const [articlesData, setArticlesData] = useState([
    { no: 1, articleId: 'art12', title: 'How to Care for Succulents', publishDate: '01-01-2025', views: 500, readTime: '4(m)', status: 'Published' },
    { no: 2, articleId: 'art123', title: 'Best Plants for Apartments', publishDate: '01-01-2025', views: 50, readTime: '3(m)', status: 'Published' },
    { no: 3, articleId: 'art44', title: 'Watering Schedule Guide', publishDate: '01-01-2025', views: 0, readTime: '0(m)', status: 'Drafted' },
    { no: 4, articleId: 'art1234', title: 'Olive Tree Care', publishDate: '01-01-2025', views: 90, readTime: '0(m)', status: 'Published' },
    { no: 5, articleId: '#ORD0001', title: 'Fixed Amount', publishDate: '01-01-2025', views: 0, readTime: '0(m)', status: 'Drafted' },
    { no: 6, articleId: '#ORD0001', title: 'Percentage', publishDate: '01-01-2025', views: 140, readTime: '3(m)', status: 'Published' },
    { no: 7, articleId: '#ORD0001', title: 'Fixed Amount', publishDate: '01-01-2025', views: 0, readTime: '0(m)', status: 'Drafted' },
    { no: 8, articleId: '#ORD0001', title: 'Fixed Amount', publishDate: '01-01-2025', views: 99, readTime: '2.3(m)', status: 'Published' },
    { no: 9, articleId: '#ORD0001', title: 'Fixed Amount', publishDate: '01-01-2025', views: 24, readTime: '2(m)', status: 'Published' },
    { no: 10, articleId: 'art56', title: 'Indoor Plant Care', publishDate: '02-15-2025', views: 120, readTime: '5(m)', status: 'Published' },
    { no: 11, articleId: 'art78', title: 'Gardening Tips for Beginners', publishDate: '02-20-2025', views: 80, readTime: '4(m)', status: 'Drafted' },
    { no: 12, articleId: 'art90', title: 'Advanced Pruning Techniques', publishDate: '03-01-2025', views: 300, readTime: '7(m)', status: 'Published' },
    { no: 13, articleId: 'art101', title: 'Composting at Home', publishDate: '03-10-2025', views: 60, readTime: '3(m)', status: 'Published' },
    { no: 14, articleId: 'art112', title: 'Understanding Soil pH', publishDate: '03-15-2025', views: 0, readTime: '0(m)', status: 'Drafted' },
  ]);

  // Admin editable statuses for articles
  const editableArticleStatuses = ['Published', 'Drafted', 'Canceled'];

  // Helper function to get CSS properties for status buttons (hex colors)
  const getStatusClasses = (status) => {
    if (status === 'Published') return 'background-color: #D1FAE5; color: #065F46;';
    if (status === 'Drafted') return 'background-color: #FEF3C7; color: #92400E;';
    if (status === 'Canceled') return 'background-color: #FEE2E2; color: #991B1B;';
    return '';
  };

  // Filter and search articles based on the active filter and search term
  const filteredAndSearchedArticles = useMemo(() => {
    return articlesData.filter(article => {
      const matchesFilter =
        (activeReviewsFilter === 'All Articles') ||
        (activeReviewsFilter === 'Published' && article.status === 'Published') ||
        (activeReviewsFilter === 'Drafted' && article.status === 'Drafted');

      const matchesSearch =
        article.articleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.status.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [articlesData, activeReviewsFilter, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSearchedArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredAndSearchedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handlers for modal actions
  const handleViewArticleDetails = (article) => {
    setSelectedArticle(article);
    setShowArticleDetailsModal(true);
  };

  const handleEditArticleStatus = (article) => {
    setSelectedArticle(article);
    setNewArticleStatus(article.status);
    setShowEditArticleStatusModal(true);
  };

  const handleDeleteArticle = (article) => {
    setSelectedArticle(article);
    setShowDeleteArticleConfirmationModal(true);
  };

  // Confirms deletion of an article
  const confirmDeleteArticle = () => {
    setArticlesData(articlesData.filter(article => article.no !== selectedArticle.no));
    setShowDeleteArticleConfirmationModal(false);
    setSelectedArticle(null);
  };

  // Saves the new status of an article
  const saveArticleStatus = () => {
    setArticlesData(articlesData.map(article =>
      article.no === selectedArticle.no ? { ...article, status: newArticleStatus } : article
    ));
    setShowEditArticleStatusModal(false);
    setSelectedArticle(null);
    setNewArticleStatus('');
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6' }} className="p-6 font-sans w-full overflow-x-hidden">
      <div className="flex justify-between mb-4">
        <Title title="Article Overview" />
      </div>

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* Top Section: Articles Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Most Viewed Article Card */}
          <div style={{ backgroundColor: '#FFFFFF' }} className="p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h2 style={{ color: '#1F2937' }} className="text-base sm:text-lg font-semibold">Most Viewed Article</h2>
            </div>
            <p style={{ color: '#059669' }} className="text-xl sm:text-2xl font-bold mb-2">"{articlesOverview.mostViewedArticle}"</p>
            <p style={{ color: '#6B7280' }} className="text-xs sm:text-sm">Last 7 days</p>
          </div>

          {/* Total Articles Card */}
          <div style={{ backgroundColor: '#FFFFFF' }} className="p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h2 style={{ color: '#1F2937' }} className="text-base sm:text-lg font-semibold">Total Articles</h2>
            </div>
            <p style={{ color: '#059669' }} className="text-3xl sm:text-4xl font-bold mb-2">{articlesOverview.totalArticles}</p>
            <p style={{ color: '#059669' }} className="text-xs sm:text-sm flex items-center">
              <HiArrowNarrowUp className="w-4 h-4 mr-1" />
              {articlesOverview.totalArticlesChange} <span style={{ color: '#6B7280' }} className="ml-1">Last 7 days</span>
            </p>
          </div>

          {/* Average Reading Time Card */}
          <div style={{ backgroundColor: '#FFFFFF' }} className="p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h2 style={{ color: '#1F2937' }} className="text-base sm:text-lg font-semibold">Average Reading Time</h2>
            </div>
            <p style={{ color: '#059669' }} className="text-3xl sm:text-4xl font-bold mb-2">{articlesOverview.averageReadingTime} (min)</p>
            <p style={{ color: '#059669' }} className="text-xs sm:text-sm flex items-center">
              <HiArrowNarrowUp className="w-4 h-4 mr-1" />
              {articlesOverview.averageReadingTimeChange} <span style={{ color: '#6B7280' }} className="ml-1">Last 7 days</span>
            </p>
          </div>
        </div>

        {/* Search and New Article Button */}
        <div className="p-4 sm:p-6 rounded-lg shadow-sm bg-white">
          <div className="p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Search for ID, title, or status"
                style={{
                  borderColor: '#D1D5DB',
                  color: '#374151',
                  outline: 'none',
                  boxShadow: '0 0 0 1px #10B981'
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <HiSearch className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            </div>
            <Link to="addNewArticle" style={{ backgroundColor: '#047857', color: '#FFFFFF' }} className="px-5 no-underline py-2 rounded-md flex items-center justify-center text-sm font-medium hover:bg-[#065F46] transition-colors">
              <HiPlus className="w-5 h-5 mr-2" />
              New Article
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 px-4 sm:px-6">
            <button
              style={{ backgroundColor: activeReviewsFilter === 'All Articles' ? '#047857' : '#F3F4F6', color: activeReviewsFilter === 'All Articles' ? '#FFFFFF' : '#374151', borderRadius: '9999px' }}
              className="px-4 py-2 text-sm font-medium hover:bg-[#E5E7EB] transition-colors"
              onClick={() => {
                setActiveReviewsFilter('All Articles');
                setCurrentPage(1);
              }}
            >
              All Articles ({articlesData.length})
            </button>
            <button
              style={{ backgroundColor: activeReviewsFilter === 'Published' ? '#047857' : '#F3F4F6', color: activeReviewsFilter === 'Published' ? '#FFFFFF' : '#374151', borderRadius: '9999px' }}
              className="px-4 py-2 text-sm font-medium hover:bg-[#E5E7EB] transition-colors"
              onClick={() => {
                setActiveReviewsFilter('Published');
                setCurrentPage(1);
              }}
            >
              Published ({articlesData.filter(a => a.status === 'Published').length})
            </button>
            <button
              style={{ backgroundColor: activeReviewsFilter === 'Drafted' ? '#047857' : '#F3F4F6', color: activeReviewsFilter === 'Drafted' ? '#FFFFFF' : '#374151', borderRadius: '9999px' }}
              className="px-4 py-2 text-sm font-medium hover:bg-[#E5E7EB] transition-colors"
              onClick={() => {
                setActiveReviewsFilter('Drafted');
                setCurrentPage(1);
              }}
            >
              Drafted ({articlesData.filter(a => a.status === 'Drafted').length})
            </button>
          </div>

          {/* Table - Made responsive with overflow-x-auto */}
          <div className="w-full overflow-x-auto shadow-sm rounded-lg border border-[#E5E7EB]">
            <table className="min-w-full divide-y divide-[#E5E7EB]">
              <thead className="bg-[#F0FDF4]">
                <tr>
                  {['No.', 'Article Id', 'Title', 'Publish Date', 'Views', 'Read Time', 'Status', 'Action'].map(header => (
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
              <tbody className="bg-white divide-y divide-[#E5E7EB]">
                {currentArticles.length > 0 ? (
                  currentArticles.map((article, index) => (
                    <tr key={article.articleId + index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{article.no}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{article.articleId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{article.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">{article.publishDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{article.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{article.readTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`} style={{ ...Object.fromEntries(getStatusClasses(article.status).split('; ').filter(s => s).map(s => s.split(': ').map(part => part.trim()))) }}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          {/* View Icon */}
                          <button
                            style={{ color: '#6B7280' }}
                            className="hover:text-[#2563EB] transition-colors"
                            title="View Details"
                            onClick={() => handleViewArticleDetails(article)}
                          >
                            <HiEye className="w-5 h-5" />
                          </button>
                          {/* Edit Icon */}
                          <button
                            style={{ color: '#6B7280' }}
                            className="hover:text-[#F59E0B] transition-colors"
                            title="Edit Status"
                            onClick={() => handleEditArticleStatus(article)}
                          >
                            <HiPencil className="w-5 h-5" />
                          </button>
                          {/* Delete Icon */}
                          <button
                            style={{ color: '#6B7280' }}
                            className="hover:text-[#DC2626] transition-colors"
                            title="Delete Article"
                            onClick={() => handleDeleteArticle(article)}
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      No matching articles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination for Articles Table */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ color: currentPage === 1 ? '#9CA3AF' : '#374151', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '0.5rem' }}
              className="flex items-center px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <HiArrowNarrowLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  style={{ backgroundColor: currentPage === pageNumber ? '#047857' : '#FFFFFF', color: currentPage === pageNumber ? '#FFFFFF' : '#374151', borderRadius: '0.5rem', borderColor: currentPage === pageNumber ? '#047857' : '#D1D5DB' }}
                  className={`px-4 py-2 hover:bg-[#E5E7EB] transition-colors ${currentPage === pageNumber ? 'shadow-md' : 'border'}`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{ color: currentPage === totalPages ? '#9CA3AF' : '#374151', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '0.5rem' }}
              className="flex items-center px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <HiArrowNarrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Details Modal */}
      {showArticleDetailsModal && selectedArticle && (
        <ArticleDetailsModal
          article={selectedArticle}
          onClose={() => setShowArticleDetailsModal(false)}
        />
      )}

      {/* Edit Article Status Modal */}
      {showEditArticleStatusModal && selectedArticle && (
        <EditArticleStatusModal
          article={selectedArticle}
          currentStatus={newArticleStatus}
          onStatusChange={setNewArticleStatus}
          onSave={saveArticleStatus}
          onClose={() => setShowEditArticleStatusModal(false)}
          editableStatuses={editableArticleStatuses}
        />
      )}

      {/* Delete Article Confirmation Modal */}
      {showDeleteArticleConfirmationModal && selectedArticle && (
        <DeleteArticleConfirmationModal
          articleTitle={selectedArticle.title}
          onConfirm={confirmDeleteArticle}
          onCancel={() => setShowDeleteArticleConfirmationModal(false)}
        />
      )}
    </div>
  );
}

// Article Details Modal Component
const ArticleDetailsModal = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
        style={{ animation: 'fadeInScale 0.3s ease-out' }}>
        <div className="flex justify-between items-center p-5 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-semibold text-[#1F2937]">Article Details</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors">
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#F9FAFB] p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 text-[#1F2937]">General Information</h3>
            <p className="text-sm text-[#4B5563] mb-1"><strong>Article ID:</strong> {article.articleId}</p>
            <p className="text-sm text-[#4B5563] mb-1"><strong>Title:</strong> {article.title}</p>
            <p className="text-sm text-[#4B5563] mb-1"><strong>Publish Date:</strong> {article.publishDate}</p>
            <p className="text-sm text-[#4B5563] mb-1"><strong>Status:</strong> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`} style={{ backgroundColor: article.status === 'Published' ? '#D1FAE5' : (article.status === 'Drafted' ? '#FEF3C7' : '#FEE2E2'), color: article.status === 'Published' ? '#065F46' : (article.status === 'Drafted' ? '#92400E' : '#991B1B') }}>{article.status}</span></p>
          </div>
          <div className="bg-[#F9FAFB] p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 text-[#1F2937]">Performance Metrics</h3>
            <p className="text-sm text-[#4B5563] mb-1"><strong>Views:</strong> {article.views}</p>
            <p className="text-sm text-[#4B5563] mb-1"><strong>Read Time:</strong> {article.readTime}</p>
            {/* Add more metrics if available in real data */}
          </div>
          {/* Add more sections for content, author, etc. if your article data expands */}
        </div>
        <style jsx>{`
            @keyframes fadeInScale {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
      </div>
    </div>
  );
};

// Edit Article Status Modal Component
const EditArticleStatusModal = ({ article, currentStatus, onStatusChange, onSave, onClose, editableStatuses }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    publicationStatus: true,
  });

  const toggleCategory = useCallback((key) => {
    setExpandedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  // Status hierarchy tailored for articles, matching the visual style of the order status modal
  const statusHierarchy = useMemo(() => ([
    {
      label: 'Update To..',
      icon: <HiArrowRight />,
      type: 'header',
      key: 'updateTo',
    },
    {
      label: 'Publication Status',
      icon: <HiPencil />,
      type: 'category',
      key: 'publicationStatus',
      expandable: true,
      statuses: [
        { name: 'Published', label: 'Published', icon: <HiCheckCircle /> },
        { name: 'Drafted', label: 'Drafted', icon: <HiClock /> },
      ].filter(s => editableStatuses.includes(s.name)),
    },
    {
      label: 'Cancel Article',
      icon: <HiXCircle />,
      type: 'status',
      name: 'Canceled',
    },
  ]), [editableStatuses]);

  const handleSelectStatus = useCallback((statusName) => {
    onStatusChange(statusName);
  }, [onStatusChange]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-300 scale-100 opacity-100"
        style={{ animation: 'fadeInScale 0.3s ease-out' }}>
        <div className="flex justify-between items-center p-5 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-semibold text-[#1F2937]">Edit Article Status</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors">
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="block text-sm font-medium text-[#4B5563] mb-4">Article ID: <span className="font-normal">{article.articleId}</span></p>

          {/* Custom Status Selection Dropdown / List */}
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden text-[#1F2937] text-sm">
            {statusHierarchy.map((item, index) => (
              <React.Fragment key={item.key || item.name || index}>
                <button
                  className={`flex justify-between items-center w-full px-4 py-3 text-left
                    ${item.type === 'header' ? 'bg-[#F9FAFB] text-base font-semibold' : 'hover:bg-[#F9FAFB]'}
                    ${item.type === 'status' && item.name === 'Canceled' ? (currentStatus === 'Canceled' ? 'bg-[#DC2626] text-white' : 'text-[#991B1B] hover:bg-[#FEE2E2]') : ''}
                  `}
                  onClick={() => item.expandable ? toggleCategory(item.key) : (item.type === 'status' && handleSelectStatus(item.name))}
                  disabled={item.type === 'header'}
                >
                  <div className="flex items-center">
                    {React.cloneElement(item.icon, { className: `h-5 w-5 mr-3 ${item.type === 'status' && item.name === 'Canceled' && currentStatus !== 'Canceled' ? 'text-[#991B1B]' : 'text-[#4B5563]'}` })}
                    <span>{item.label}</span>
                  </div>
                  {item.expandable && (
                    <HiChevronDown className={`w-5 h-5 text-[#9CA3AF] transition-transform duration-200 ${expandedCategories[item.key] ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {item.type === 'category' && expandedCategories[item.key] && (
                  <div className="px-4 py-2 border-t border-[#E5E7EB] bg-white">
                    {item.statuses.map(status => (
                      <button
                        key={status.name}
                        className={`flex items-center w-full py-2 px-2 text-left rounded-md transition-colors duration-150 mb-1 last:mb-0
                          ${currentStatus === status.name ? 'bg-[#047857] text-white' : 'text-[#4B5563] hover:bg-[#F3F4F6]'}`}
                        onClick={() => handleSelectStatus(status.name)}
                      >
                        {React.cloneElement(status.icon, { className: `h-4 w-4 mr-2 ${currentStatus === status.name ? 'text-white' : 'text-[#4B5563]'}` })}
                        <span>{status.label || status.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                {index < statusHierarchy.length - 1 && item.type !== 'status' && (
                  <hr className="border-t border-[#E5E7EB]" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-[#D1D5DB] text-sm font-medium text-[#4B5563] bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 rounded-md text-white text-sm font-medium bg-[#10B981] hover:bg-[#065F46] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component for Articles
const DeleteArticleConfirmationModal = ({ articleTitle, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-300 scale-100 opacity-100"
        style={{ animation: 'fadeInScale 0.3s ease-out' }}>
        <div className="flex justify-between items-center p-5 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-semibold text-[#1F2937]">Confirm Deletion</h2>
          <button onClick={onCancel} className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors">
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-[#4B5563] mb-6">Are you sure you want to delete article "<span className="font-semibold">{articleTitle}</span>"? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md border border-[#D1D5DB] text-sm font-medium text-[#4B5563] bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md text-white text-sm font-medium bg-[#DC2626] hover:bg-[#B91C1C] transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesOverview;
