import React, { useState } from 'react';

export function AddNewProductForm() {
  const [productName, setProductName] = useState('Poppy');
  const [productDescription, setProductDescription] = useState("Bring, vibrant beauty and timeless symbolism to any space with the Poppy Flower—a striking bloom known for its delicate, paper-like petals and bold, captivating colors. Most commonly found in vivid shades of red, orange, and white, the poppy is more than just a flower; it's a powerful emblem of remembrance, peace, and resilience.");
  const [productPrice, setProductPrice] = useState('15.00');
  const [discountedPrice, setDiscountedPrice] = useState('5');
  const [taxIncluded, setTaxIncluded] = useState('yes');
  const [stockQuantity, setStockQuantity] = useState('Unlimited');
  const [stockStatus, setStockStatus] = useState('In Stock');
  const [isUnlimited, setIsUnlimited] = useState(true);
  const [highlightFeatured, setHighlightFeatured] = useState(true);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm font-sans  mx-auto my-8">
      {/* Header and Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-xl font-semibold text-gray-800">Add New Product</h1> */}
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3V12m-8.25 6.75H12" />
            </svg>
            Save to draft
          </button>
          <button className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-green-hover transition-colors flex items-center">
            Publish Product
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Basic Details, Pricing, Inventory */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Details</h2>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                id="productName"
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
              <div className="relative">
                <textarea
                  id="productDescription"
                  rows="6"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
                <div className="absolute bottom-2 right-2 flex space-x-2 text-gray-400">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M16.5 3.75V7.5a.75.75 0 0 1-.75.75h-3.75a.75.75 0 0 1-.75-.75V3.75m-3 0V7.5a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V3.75M6.75 3.75H4.875c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h14.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H16.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="productPrice"
                    className="block w-full rounded-md border-gray-300 pl-7 pr-16 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
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
                <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (Optional)</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="discountedPrice"
                    className="block w-full rounded-md border-gray-300 pl-7 pr-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Included</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="taxYes"
                      name="taxIncluded"
                      type="radio"
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      value="yes"
                      checked={taxIncluded === 'yes'}
                      onChange={(e) => setTaxIncluded(e.target.value)}
                    />
                    <label htmlFor="taxYes" className="ml-2 block text-sm text-gray-900">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="taxNo"
                      name="taxIncluded"
                      type="radio"
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      value="no"
                      checked={taxIncluded === 'no'}
                      onChange={(e) => setTaxIncluded(e.target.value)}
                    />
                    <label htmlFor="taxNo" className="ml-2 block text-sm text-gray-900">No</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
                <span className="font-semibold text-green-700">$5</span>
                <span>Sale = $10.00</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    id="startDate"
                    placeholder="Start"
                    className="block w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    value="Start" // Static for now, can be state
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12V12Zm.375 0h.008v.008h-.008V12Zm.375 0h.008v.008h-.008V12Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-white mb-1 invisible">End Date Label</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    id="endDate"
                    placeholder="End"
                    className="block w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    value="End" // Static for now, can be state
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12V12Zm.375 0h.008v.008h-.008V12Zm.375 0h.008v.008h-.008V12Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="text"
                  id="stockQuantity"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  disabled={isUnlimited}
                />
              </div>
              <div>
                <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select
                  id="stockStatus"
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="unlimitedToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    id="unlimitedToggle"
                    type="checkbox"
                    className="sr-only"
                    checked={isUnlimited}
                    onChange={() => setIsUnlimited(!isUnlimited)}
                  />
                  <div className={`block w-10 h-6 rounded-full ${isUnlimited ? 'bg-green' : 'bg-gray-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isUnlimited ? 'translate-x-full' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-700 text-sm">Unlimited</div>
              </label>
            </div>
            <div className="flex items-center">
              <label htmlFor="highlightToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    id="highlightToggle"
                    type="checkbox"
                    className="sr-only"
                    checked={highlightFeatured}
                    onChange={() => setHighlightFeatured(!highlightFeatured)}
                  />
                  <div className={`block w-10 h-6 rounded-full ${highlightFeatured ? 'bg-green' : 'bg-gray-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${highlightFeatured ? 'translate-x-full' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-700 text-sm">Highlight this product in a featured section.</div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Upload Product Image, Categories */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Product Image */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Product Image</h2>
            <p className="text-sm text-gray-700 mb-3">Product Image</p>
            <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                          </div>
            <div className="flex space-x-3 mb-4">
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                Browse
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-red-600 text-sm hover:bg-gray-50">
                Replace
              </button>
            </div>
            <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-6 text-gray-500 cursor-pointer hover:border-green-500 hover:text-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v11.25A1.5 1.5 0 0 0 3.75 18Z" />
              </svg>
              <span>Add Image</span>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
            <div className="mb-4">
              <label htmlFor="productCategories" className="block text-sm font-medium text-gray-700 mb-1">Product Categories</label>
              <select
                id="productCategories"
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option>Select your product</option>
                <option>Flowers</option>
                <option>Plants</option>
                <option>Gifts</option>
                <option>Pots</option>
                <option>Care</option>
                <option>Accessory</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="productTag" className="block text-sm font-medium text-gray-700 mb-1">Product Tag</label>
              <select
                id="productTag"
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option>Select your product</option>
                <option>New Arrivals</option>
                <option>Best Sellers</option>
                <option>On Sale</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Pot color</label>
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full border border-gray-300 bg-gray-100 hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border border-gray-300 bg-yellow-300 hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border border-gray-300 bg-red-300 hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border border-gray-300 bg-gray-600 hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border border-gray-300 bg-black hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center hover:bg-green-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Pot Sizes</label>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100">S</button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100">M</button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100">XL</button>
                <button className="px-4 py-2 border-2 border-green text-green rounded-md text-sm flex items-center justify-center hover:bg-green-hover transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons (Mobile/Smaller Screens) - If needed, based on typical form patterns */}
      <div className="mt-6 flex justify-end space-x-3 ">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Save to draft</button>
        <button className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-green-hover">Publish Product</button>
      </div>
    </div>
  );
}

export default AddNewProductForm;