import React from 'react'
import {Link } from "react-router-dom"
const Footer = () => {
  return (
    <>
            {/* <div className="h-[1px] w-full bg-gray-200 mt-4"></div> */}

    <footer className="bg-white pt-5 pb-2 px-6 md:px-20 pt-[10px] pb-[30px]">


      {/*   <img src="imges/Logo.png" className="block w-[80px] h-auto md:w-[100px]  md:ml-0 " /> */}
      <div className="  flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0 ">
          <img src="imges/Logo.png" className="block w-[80px] h-auto mr-6" />

              <nav class="hidden lg:flex space-x-5 lg:space-x-8 text-[#4B5929]">
                  <Link  to="/productList" className="hover:text-gray-800 no-underline text-black">Product</Link>
                  <Link  to="/Login" className="hover:text-gray-800 no-underline text-black">Log In</Link>
                  <Link  to="/Payment" className="hover:text-gray-800 no-underline text-black">Payment</Link>
                  <Link to="/#About" className="hover:text-gray-800 no-underline text-black">About Us</Link>
                  <Link  to="/#Sellers" className="hover:text-gray-800 no-underline text-black">Sellers</Link>
              </nav>
          </div>
          <div className="mb-6 md:mb-0 ">
              <h5 className="text-lg font-semibold text-[#4B5929] mb-2">Newsletter</h5>
              <div className="flex">
                  <input type="email" placeholder="juzoor@gmail.com" class="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-[#4B5929]" />
                  <button className="bg-[#4B5929] text-white rounded-md py-2 px-4 ml-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#A8C686]">Subscribe</button>
              </div>
          </div>
      </div>
  <div className="h-[1px] w-full bg-gray-200 mt-4"></div>
      <div className=" mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 BB. All rights reserved.</p>
          <nav className="flex space-x-8 text-[#4B5929]">
              <Link to="#" className=" text-black no-underline hover:text-gray-700">Terms</Link>
              <Link to="#" className=" text-black no-underline hover:text-gray-700">Privacy</Link>
              <Link to="#" className=" text-black no-underline hover:text-gray-700">Cookies</Link>
          </nav>
      </div>
  </footer>
  </>
  )
}

export default Footer
