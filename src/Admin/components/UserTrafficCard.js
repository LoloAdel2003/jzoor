import React, { useState } from 'react';

export function UserProfilePage() {
  // State for Profile Update section
  const [firstName, setFirstName] = useState('Ahmad');
  const [lastName, setLastName] = useState('Kanaan');
  const [password, setPassword] = useState('********'); // Placeholder for password
  const [phoneNumber, setPhoneNumber] = useState('(970) 559-0120');
  const [email, setEmail] = useState('Ahmad.Kanaan@example.com');
  const [dateOfBirth, setDateOfBirth] = useState('12- January- 1999');
  const [location, setLocation] = useState('2972 Westheimer Rd. Santa Ana, Illinois 85486');
  const [creditCard, setCreditCard] = useState('843-4359-4444');
  const [biography, setBiography] = useState('Plant lover | E-commerce enthusiast | Committed to sustainable living\nI manage Juzoor, where I help connect people with beautiful, healthy plants and easy care tips—delivered locally with love.');

  // State for Change Password section
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  // State for password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  return (
    <div className="bg-[#f3f4f6]  min-h-screen font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Left Column: Profile Card and Change Password */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-end items-center mb-4 space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186A4.486 4.486 0 0 1 12 12.75a4.486 4.486 0 0 1 4.783-2.186m-9.566 0A4.486 4.486 0 0 0 7.217 12.75h-.001c.001-.246.01-.491.026-.737M7.217 10.907c.054-.189.105-.375.162-.56M12 12.75a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H10.5a2.25 2.25 0 0 0-2.25 2.25v3.75m-9.75 0h9.75m-4.5-9.75a2.25 2.25 0 0 0-2.25 2.25V9m8.25-6.75h.97a2.25 2.25 0 0 1 2.25 2.25V9m0 3.75h9.75m-4.5 9.75h.97a2.25 2.25 0 0 0 2.25-2.25V15m0-3.75h-9.75m-4.5 3.75H5.25a2.25 2.25 0 0 0-2.25 2.25V15" />
                </svg>
              </button>
            </div>
            <img
              src="/imges/17 Picture.webp" // Placeholder image for profile picture
              alt="Ahmad Kanaan"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Ahmad Kanaan</h2>
            <p className="text-sm text-gray-600 mb-2 flex items-center justify-center">
              Ahmad.Kanaan@example.com
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75H9m6 0a2.25 2.25 0 1 0 0 4.5m0-4.5c.135-.078.27-.156.405-.234A3.375 3.375 0 0 0 18 10.5V6.75m-4.5 3.003L9.75 9.75m9 0a2.25 2.25 0 1 0 0 4.5m0-4.5c.135-.078.27-.156.405-.234A3.375 3.375 0 0 0 18 10.5V6.75m-4.5 3.003L9.75 9.75m9 0a2.25 2.25 0 1 0 0 4.5m0-4.5c.135-.078.27-.156.405-.234A3.375 3.375 0 0 0 18 10.5V6.75m-4.5 3.003L9.75 9.75M9 15.75H3.75A2.25 2.25 0 0 1 1.5 13.5V6.75a2.25 2.25 0 0 1 2.25-2.25h10.5a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 15.75 18H9z" />
              </svg>
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Plant lover | E-commerce enthusiast | Committed to sustainable living
            </p>
          </div>

          {/* Change Password */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
              <a href="#" className="text-blue-600 text-sm">Need help?</a>
            </div>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={showCurrentPassword ? "M3.988 5.5A10.55 10.55 0 0 0 12 3c4.956 0 9.231 3.425 10.231 8.358.113.567-.323 1.142-.907 1.142-.486 0-.967-.354-1.124-.871C19.782 11.238 16.71 9 12 9s-7.782 2.238-8.192 4.129c-.157.517-.638.871-1.124.871-.584 0-1.02-.575-.907-1.142A10.55 10.55 0 0 0 3.988 5.5z" : "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"} />
                    <path strokeLinecap="round" strokeLinejoin="round" d={showCurrentPassword ? "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" : "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"} />
                  </svg>
                </button>
              </div>
              <a href="#" className="text-blue-600 text-sm mt-1 block">Forgot Current Password? Click here</a>
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={showNewPassword ? "M3.988 5.5A10.55 10.55 0 0 0 12 3c4.956 0 9.231 3.425 10.231 8.358.113.567-.323 1.142-.907 1.142-.486 0-.967-.354-1.124-.871C19.782 11.238 16.71 9 12 9s-7.782 2.238-8.192 4.129c-.157.517-.638.871-1.124.871-.584 0-1.02-.575-.907-1.142A10.55 10.55 0 0 0 3.988 5.5z" : "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"} />
                    <path strokeLinecap="round" strokeLinejoin="round" d={showNewPassword ? "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" : "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"} />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="reEnterPassword" className="block text-sm font-medium text-gray-700 mb-1">Re-enter Password</label>
              <div className="relative">
                <input
                  type={showReEnterPassword ? 'text' : 'password'}
                  id="reEnterPassword"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowReEnterPassword(!showReEnterPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={showReEnterPassword ? "M3.988 5.5A10.55 10.55 0 0 0 12 3c4.956 0 9.231 3.425 10.231 8.358.113.567-.323 1.142-.907 1.142-.486 0-.967-.354-1.124-.871C19.782 11.238 16.71 9 12 9s-7.782 2.238-8.192 4.129c-.157.517-.638.871-1.124.871-.584 0-1.02-.575-.907-1.142A10.55 10.55 0 0 0 3.988 5.5z" : "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"} />
                    <path strokeLinecap="round" strokeLinejoin="round" d={showReEnterPassword ? "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" : "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"} />
                  </svg>
                </button>
              </div>
            </div>
            <button className="w-full bg-green-700 text-white py-2 rounded-lg font-medium hover:bg-green-800 transition-colors mt-4">
              Save Change
            </button>
          </div>
        </div>

        {/* Right Column: Profile Update Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Profile Update</h2>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                Edit
              </button>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex items-center mb-6">
              <img
                src="/imges/17 Picture.webp" // Placeholder for profile picture update
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">
                  Upload New
                </button>
                <button className="px-4 py-2 border border-gray-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="profilePassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="profilePassword"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    id="phoneNumber"
                    className="block w-full rounded-md border-gray-300 pl-3 pr-16 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <img src="https://flagcdn.com/w20/ps.webp" alt="Palestine Flag" className="h-4 w-6 rounded-sm" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    id="dateOfBirth"
                    className="block w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12V12Zm.375 0h.008v.008h-.008V12Zm.375 0h.008v.008h-.008V12Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                id="location"
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Credit Card */}
            <div className="mb-6">
              <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700 mb-1">Credit Card</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  id="creditCard"
                  className="block w-full rounded-md border-gray-300 pl-10 pr-10 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={creditCard}
                  onChange={(e) => setCreditCard(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9.75h19.5M2.25 14.25h19.5m-16.5 4.5h16.5M2.25 5.25h19.5a2.25 2.25 0 0 1 2.25 2.25v12.75a2.25 2.25 0 0 1-2.25 2.25H2.25a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25ZM16.5 2.25h-9" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div>
              <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
              <div className="relative">
                <textarea
                  id="biography"
                  rows="5"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                ></textarea>
                <div className="absolute bottom-2 right-2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;