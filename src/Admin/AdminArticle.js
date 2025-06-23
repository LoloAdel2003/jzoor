import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="flex justify-between py-4">
        <h1 className="text-xl font-semibold text-gray-800">Article Overview</h1>

        <div className="flex space-x-2 text-sm">
          <button
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
          </button>
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
              </button>
            </div>
            <p style={{ color: '#111827' }} className="text-xl sm:text-2xl font-bold mb-2">"{articlesOverview.mostViewedArticle}"</p>
            <p style={{ color: '#6B7280' }} className="text-xs sm:text-sm">Last 7 days</p>
          </div>

          {/* Total Articles Card */}
          <div style={{ backgroundColor: '#FFFFFF' }} className="p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h2 style={{ color: '#1F2937' }} className="text-base sm:text-lg font-semibold">Total Articles</h2>
            </div>
            <p style={{ color: '#111827' }} className="text-3xl sm:text-4xl font-bold mb-2">{articlesOverview.totalArticles}</p>
            <p style={{ color: '#059669' }} className="text-xs sm:text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
              {articlesOverview.totalArticlesChange} <span style={{ color: '#6B7280' }} className="ml-1">Last 7 days</span>
            </p>
          </div>

          {/* Average Reading Time Card */}
          <div style={{ backgroundColor: '#FFFFFF' }} className="p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h2 style={{ color: '#1F2937' }} className="text-base sm:text-lg font-semibold">Average Reading Time</h2>
              <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
              </button>
            </div>
            <p style={{ color: '#111827' }} className="text-3xl sm:text-4xl font-bold mb-2">{articlesOverview.averageReadingTime} (min)</p>
            <p style={{ color: '#059669' }} className="text-xs sm:text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#9CA3AF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Link to="addNewArticle"  style={{ backgroundColor: '#047857', color: '#FFFFFF' }} className="px-5 no-underline py-2 rounded-md flex items-center justify-center text-sm font-medium hover:bg-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
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
          <div className="max-w-[300px] lg:min-w-full">

            
            
            
            

            <table className="min-w-full divide-y" style={{ borderColor: '#E5E7EB' }}>
              <thead style={{ backgroundColor: '#F0FDF4' }}>
                <tr>
                {['No.', 'Article Id', 'title', 'Publish Date', 'Views', 'Read Time','Status', 'Action'].map(header => (
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </button>
                          <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesOverview;