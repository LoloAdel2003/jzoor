import React from 'react';

export function UsersActivityCard() {
  // Dummy data for users per minute chart (representing relative heights)
  const usersPerMinuteData = [
    0.6, 0.7, 0.8, 0.6, 0.5, 0.7, 0.9, 1.0, 0.8, 0.7, 0.6, 0.5, 0.6, 0.7, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3,
    0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.4, 0.5
  ];

  // Dummy data for sales by country
  const salesByCountry = [
    { country: 'Palestine', code: 'PL', users: '5K', percentage: '25.8%', type: 'increase', flag: '🇵🇸' },
    { country: 'Jordan', code: 'Jordan', users: '2.4K', percentage: '15.8%', type: 'decrease', flag: '🇯🇴' },
    { country: 'Egypt', code: 'Egypt', users: '2.6K', percentage: '35.8%', type: 'increase', flag: '🇪🇬' },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} className="p-4 sm:p-6 flex flex-col w-full md:w-96">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 style={{ color: '#6366F1' }} className="text-base sm:text-lg font-semibold">Users in last 30 minutes</h3>
        <button style={{ color: '#6B7280' }} className="hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
      </div>

      {/* Users Count */}
      <p style={{ color: '#111827' }} className="text-3xl sm:text-4xl font-bold mb-4">10K</p>

      {/* Users per minute Chart */}
      <div className="mb-4">
        <p style={{ color: '#374151' }} className="text-sm font-medium mb-2">Users per minute</p>
        <div className="flex items-end h-20 space-x-0.5">
          {usersPerMinuteData.map((height, index) => (
            <div
              key={index}
              style={{ height: `${height * 100}%`, backgroundColor: '#4CAF50' }} // Green color for bars
              className="w-1 rounded-sm"
            ></div>
          ))}
        </div>
      </div>

      {/* Sales by Country Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <p style={{ color: '#374151' }} className="text-sm font-medium">Sales by Country</p>
          <p style={{ color: '#374151' }} className="text-sm font-medium">Sales</p>
        </div>

        {salesByCountry.map((data, index) => (
          <div key={index} className="flex items-center mb-4 relative z-0">
            {/* Map background (simulated with a div for simplicity) */}
            {/* In a real app, this would be a map component (e.g., react-leaflet, react-google-maps) */}
            <div className="absolute inset-0 z-0 opacity-5" style={{
              backgroundImage: 'url("https://via.placeholder.com/300x150/f0f4f8?text=Map+Background")', // Placeholder for map
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '0.25rem',
            }}></div>

            <div className="flex items-center w-1/3 z-10">
              <span className="text-2xl mr-2">{data.flag}</span>
              <span style={{ color: '#374151' }} className="text-sm font-medium">{data.users}</span>
              <span style={{ color: '#6B7280' }} className="text-xs ml-1">{data.code}</span>
            </div>
            <div className="w-2/3 flex items-center z-10">
              {/* Progress bar */}
              <div style={{ backgroundColor: '#A78BFA' }} className="h-2 rounded-full w-2/3 mr-2">
                {/* Dynamic width for the progress bar based on data could be added here */}
                {/* Example: style={{ width: `${(parseFloat(data.users) / 5) * 100}%` }} */}
              </div>
              <span style={{ color: data.type === 'increase' ? '#059669' : '#EF4444' }} className="text-xs flex items-center font-medium">
                {data.type === 'increase' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                  </svg>
                )}
                {data.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View Insight Button */}
      <button style={{ backgroundColor: '#FFFFFF', color: '#6366F1', borderColor: '#6366F1' }} className="w-full py-2 rounded-md border text-sm font-medium hover:bg-indigo-50">
        View Insight
      </button>
    </div>
  );
}

export default UsersActivityCard;