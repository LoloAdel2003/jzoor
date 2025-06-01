import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart, handleIncrement, handleDecrement } = useContext(ProductContext);

  const total = cart.reduce((acc, item) => acc + item.new_price * item.quantity, 0);

  return (
    <>
    {cart.length === 0 ? (<div className="flex justify-center text-center items-center h-svh"> <div>
      <img src="imges/a.png" alt="empty" className="w-[150px] md:w-[250px] lg:w-[350px] block mr-auto ml-auto" />
      <p className="text-green text-xl md:text-3xl pt-2 font-bold">Oops! Nothing here yet</p>
      <p className="text-gray-600">Lets fix that!</p>
      <Link to="/productList" className="bg-green  no-underline text-white w-full text-center px-2 md:py-4 py-2 rounded-md border-[##8B6F47] hover:bg-green-hover hover:text-white transition shadow-md">Start Shoping </Link>
      <p className="pt-2 md:pt-4 text-gray-500">Browse product and find your next favorite!</p>
      </div></div>): ( <div className="pt-[60px] md:pt-[120px] container grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-screen">
      {/* Cart Table */}
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md md:text-3xl font-bold text-[#4B5929]">Shopping Cart</h2>
          <p className="font-medium">{cart.length} Items</p>
        </div>
        <div className="hidden md:grid grid-cols-4 text-sm font-semibold border-b pb-2 text-gray-700">
          <p>Product Details</p>
          <p className="text-center">Quantity</p>
          <p className="text-center">Total</p>
          <p className="text-end">Remove</p>
        </div>

        <div className="space-y-6 mt-4">
          {cart.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 items-center bg-white p-4 border rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={item.img} alt={item.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <h3 className="font-semibold text-[#4B5929] text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500">${item.new_price}</p>
                </div>
              </div>
              <div className="flex justify-center mt-2 md:mt-0">
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="w-8 h-8 border rounded-l text-lg font-bold hover:bg-gray-100"
                >-</button>
                <span className="w-10 h-8 flex items-center justify-center border-t border-b">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="w-8 h-8 border rounded-r text-lg font-bold hover:bg-gray-100"
                >+</button>
              </div>
              <p className="text-center font-semibold mt-2 md:mt-0">${(item.new_price * item.quantity).toFixed(2)}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline font-semibold text-sm"
                >Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="bg-gray-100/40 p-6 rounded-lg shadow-md border-left">
        <h2 className="text-lg font-bold mb-4 text-[#4B5929]">Mariam Eqdaih</h2>
        <p className="text-sm text-gray-600 mb-4">Palestine-Gaza, Al-Nusirat, 20 street</p>
        <div className="mb-4">
          <h5 className="font-semibold text-gray-700">Payment Method</h5>
          <p className="text-sm text-gray-600">Credit Card</p>
          <p className="text-sm text-gray-600">**** **** **** 5075</p>
        </div>

        <div className="mb-4">
          <h6 className="font-semibold text-gray-700">Do You Have Any Discount Code?</h6>
          <div className="flex mt-2">
            <input
              type="text"
              placeholder="Enter code"
              className="border rounded-l px-3 py-1 w-full focus:outline-none"
            />
            <button className="bg-[#4B5929] text-white px-4 rounded-r hover:bg-[#3c471f]">Apply</button>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>$0</span>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="no-underline block w-full text-center mt-4 bg-green text-white py-2 rounded hover:bg-green-hover"
          >
            Checkout
          </Link>
          {/* <button 
            onClick={clearCart}
            className="w-full text-center mt-2 text-sm text-red-500 hover:underline"
          >
            Clear Cart
          </button> */}
        </div>
      </div>
    </div>)}
  </> 
  );
};

export default Cart;
