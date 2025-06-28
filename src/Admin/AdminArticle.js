import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineDotsVertical, // لزر الثلاث نقاط في البطاقات
  HiOutlineArrowNarrowUp, // للسهم الصاعد للتغيير الإيجابي
  HiOutlinePlus, // لزر "New Article"
  HiOutlineSearch, // لأيقونة البحث
  HiOutlineEye, // لأيقونة "View" في عمود الإجراءات
  HiOutlinePencil, // لأيقونة "Edit" في عمود الإجراءات
  HiOutlineTrash, // لأيقونة "Delete" في عمود الإجراءات
  HiOutlineArrowNarrowLeft, // للسهم السابق في الترقيم
  HiOutlineArrowNarrowRight // للسهم التالي في الترقيم
} from 'react-icons/hi'; // افتراض استخدام Heroicons
import Title from './components/Title';

export function ArticlesOverview() {
  const [activeReviewsFilter, setActiveReviewsFilter] = useState('All Articles');
  const [activeTimeframe, setActiveTimeframe] = useState('This week');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // عدد المقالات في كل صفحة

  const articlesOverview = {
    mostViewedArticle: "Olive Tree Care",
    totalArticles: 400,
    totalArticlesChange: "+20%",
    averageReadingTime: 3, // in minutes
    averageReadingTimeChange: "+20%",
  };

  const articlesData = [
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
  ];

  // دالة مساعدة لإرجاع خصائص CSS لأزرار الحالة
  const getStatusClasses = (status) => {
    if (status === 'Published') return 'background-color: #D1FAE5; color: #065F46;'; // bg-green-100, text-green-700
    if (status === 'Drafted') return 'background-color: #FEF3C7; color: #92400E;'; // bg-yellow-100, text-yellow-800
    return '';
  };

  // تصفية وبحث المقالات بناءً على الفلتر ومصطلح البحث
  const filteredAndSearchedArticles = useMemo(() => {
    return articlesData.filter(article => {
      const matchesFilter =
        (activeReviewsFilter === 'All Articles') ||
        (activeReviewsFilter === 'Published' && article.status === 'Published') ||
        (activeReviewsFilter === 'Drafted' && article.status === 'Drafted');

      const matchesSearch =
        article.articleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.status.toLowerCase().includes(searchTerm.toLowerCase()); // إضافة البحث عن الحالة

      return matchesFilter && matchesSearch;
    });
  }, [articlesData, activeReviewsFilter, searchTerm]);

  // منطق التقسيم إلى صفحات (Pagination)
  const totalPages = Math.ceil(filteredAndSearchedArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredAndSearchedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: '#F3F4F6' }} className="p-6 font-sans w-full overflow-x-hidden">
      <div className="flex justify-between mb-4">
        <Title title="Article Overview" />
        {/* <h1 className="text-x l font-semibold text-gray-800">Article Overview</h1> */}

        <div className="flex space-x-2 text-sm">
          {/* <button
            style={{ backgroundColor: activeTimeframe === 'This week' ? '#D1FAE5' : 'transparent', color: activeTimeframe === 'This week' ? '#065F46' : '#6B7280' }}
            className="px-3 py-1 rounded-md hover:bg-gray-50"
            onClick={() => setActiveTimeframe('This week')}
          >
            This week
          </button>
          <button
            style={{ backgroundColor: activeTimeframe === 'Last week' ? '#D1FAE5' : 'transparent', color: activeTimeframe === 'Last week' ? '#065F46' : '#6B7280' }}
            className="px-3 py-1 rounded-md hover:bg-gray-50"
            onClick={() => setActiveTimeframe('Last week')}
          >
            Last week
          </button> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* Top Section: Articles Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Most Viewed Article Card */}
          <div style={{ backgroundColor: '#FFFFFF' }} className="p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h2 style={{ color: '#1F2937' }} className="text-base sm:text-lg font-semibold">Most Viewed Article</h2>
              <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
                {/* <HiOutlineDotsVertical className="w-5 h-5" /> */}
              </button>
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
              {/* <HiOutlineArrowNarrowUp className="w-4 h-4 mr-1" /> */}
              {articlesOverview.totalArticlesChange} <span style={{ color: '#6B7280' }} className="ml-1">Last 7 days</span>
            </p>
          </div>

          {/* Average Reading Time Card */}
          <div style={{ backgroundColor: '#FFFFFF' }} className="p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h2 style={{ color: '#1F2937' }} className="text-base sm:text-lg font-semibold">Average Reading Time</h2>
              <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
                {/* <HiOutlineDotsVertical className="w-5 h-5" /> */}
              </button>
            </div>
            <p style={{ color: '#059669' }} className="text-3xl sm:text-4xl font-bold mb-2">{articlesOverview.averageReadingTime} (min)</p>
            <p style={{ color: '#059669' }} className="text-xs sm:text-sm flex items-center">
              {/* <HiOutlineArrowNarrowUp className="w-4 h-4 mr-1" /> */}
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
                  setCurrentPage(1); // إعادة تعيين الصفحة عند البحث
                }}
              />
              <HiOutlineSearch className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            </div>
            <Link to="addNewArticle" style={{ backgroundColor: '#047857', color: '#FFFFFF' }} className="px-5 no-underline py-2 rounded-md flex items-center justify-center text-sm font-medium hover:bg-green-700">
              <HiOutlinePlus className="w-5 h-5 mr-2" />
              New Article
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 px-4 sm:px-6">
            <button
              style={{ backgroundColor: activeReviewsFilter === 'All Articles' ? '#047857' : '#F3F4F6', color: activeReviewsFilter === 'All Articles' ? '#FFFFFF' : '#374151', borderRadius: '9999px' }}
              className="px-4 py-2 text-sm font-medium hover:bg-gray-200"
              onClick={() => {
                setActiveReviewsFilter('All Articles');
                setCurrentPage(1); // إعادة تعيين الصفحة عند تغيير الفلتر
              }}
            >
              All Articles ({articlesData.length})
            </button>
            <button
              style={{ backgroundColor: activeReviewsFilter === 'Published' ? '#047857' : '#F3F4F6', color: activeReviewsFilter === 'Published' ? '#FFFFFF' : '#374151', borderRadius: '9999px' }}
              className="px-4 py-2 text-sm font-medium hover:bg-gray-200"
              onClick={() => {
                setActiveReviewsFilter('Published');
                setCurrentPage(1); // إعادة تعيين الصفحة عند تغيير الفلتر
              }}
            >
              Published ({articlesData.filter(a => a.status === 'Published').length})
            </button>
            <button
              style={{ backgroundColor: activeReviewsFilter === 'Drafted' ? '#047857' : '#F3F4F6', color: activeReviewsFilter === 'Drafted' ? '#FFFFFF' : '#374151', borderRadius: '9999px' }}
              className="px-4 py-2 text-sm font-medium hover:bg-gray-200"
              onClick={() => {
                setActiveReviewsFilter('Drafted');
                setCurrentPage(1); // إعادة تعيين الصفحة عند تغيير الفلتر
              }}
            >
              Drafted ({articlesData.filter(a => a.status === 'Drafted').length})
            </button>
          </div>

          {/* Table - Made responsive with overflow-x-auto */}
          <div className="w-full overflow-x-auto lg:overflow-x-visible" style={{ borderColor: '#E5E7EB', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <div className="max-w-[250px] lg:min-w-full">
              <table className="min-w-full divide-y" style={{ borderColor: '#E5E7EB' }}>
                <thead style={{ backgroundColor: '#F0FDF4' }}>
                  <tr>
                    {['No.', 'Article Id', 'title', 'Publish Date', 'Views', 'Read Time', 'Status', 'Action'].map(header => (
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
                <tbody style={{ backgroundColor: '#FFFFFF', divideColor: '#E5E7EB' }}>
                  {currentArticles.length > 0 ? (
                    currentArticles.map((article, index) => (
                      <tr key={article.articleId + index}> {/* استخدام articleId + index كمفتاح فريد */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#374151' }}>{article.no}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#374151' }}>{article.articleId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#111827' }}>{article.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#6B7280' }}>{article.publishDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#374151' }}>{article.views}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#374151' }}>{article.readTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`} style={{ ...Object.fromEntries(getStatusClasses(article.status).split('; ').filter(s => s).map(s => s.split(': ').map(part => part.trim()))) }}>
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
                              <HiOutlineEye className="w-5 h-5" />
                            </button>
                            <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
                              <HiOutlinePencil className="w-5 h-5" />
                            </button>
                            <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
                              <HiOutlineTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        لا توجد مقالات مطابقة للمعايير المحددة.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination for Articles Table */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ color: currentPage === 1 ? '#9CA3AF' : '#374151', backgroundColor: 'transparent', border: '1px solid #D1D5DB', borderRadius: '0.5rem' }}
              className="flex items-center px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiOutlineArrowNarrowLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  style={{ backgroundColor: currentPage === pageNumber ? '#10B981' : 'transparent', color: currentPage === pageNumber ? '#FFFFFF' : '#374151', borderRadius: '0.5rem' }}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{ color: currentPage === totalPages ? '#9CA3AF' : '#374151', backgroundColor: 'transparent', border: '1px solid #D1D5DB', borderRadius: '0.5rem' }}
              className="flex items-center px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <HiOutlineArrowNarrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesOverview;