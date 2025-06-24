import React, { useState } from 'react';
import {
  HiOutlineDocumentArrowDown, // For Save to Draft
  HiOutlinePlus,              // For Publish Product, Add Image, Add Pot Color/Size
  HiOutlinePencil,            // For edit icon in description
  HiOutlineTrash,             // For delete icon in description
  HiOutlineChevronDown,       // For dropdown arrows
  HiOutlineCalendar,          // For calendar icon in expiration
  HiOutlinePhoto,             // For add image placeholder
} from 'react-icons/hi2'; // Using hi2 for newer icons if available, or hi if prefered.
                           // Note: If some icons are not found in hi2, try 'hi' or 'fa'/'bs' etc.

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
    <div className="bg-white p-4 rounded-lg shadow-sm font-sans mx-auto my-8">
      {/* Header and Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-input-border rounded-lg text-gray-standard-700 font-medium hover:bg-gray-standard-50 flex items-center">
            {/* Replaced SVG with HiOutlineDocumentArrowDown */}
            <HiOutlineDocumentArrowDown className="w-5 h-5 mr-2" />
            Save to draft
          </button>
          <button className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-brand-green-hover transition-colors flex items-center">
            Publish Product
            {/* Replaced SVG with HiOutlinePlus */}
            <HiOutlinePlus className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Basic Details, Pricing, Inventory */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <div className="bg-form-bg p-6 border border-form-border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-standard-800 mb-4">Basic Details</h2>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-sm font-medium text-text-form-label mb-1">Product Name</label>
              <input
                type="text"
                id="productName"
                className="w-full border border-input-border rounded-md shadow-sm p-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="productDescription" className="block text-sm font-medium text-text-form-label mb-1">Product Description</label>
              <div className="relative">
                <textarea
                  id="productDescription"
                  rows="6"
                  className="w-full border border-input-border rounded-md shadow-sm p-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green resize-none"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
                <div className="absolute bottom-2 right-2 flex space-x-2 text-gray-standard-400">
                  <button>
                    {/* Replaced SVG with HiOutlinePencil */}
                    <HiOutlinePencil className="w-5 h-5" />
                  </button>
                  <button>
                    {/* Replaced SVG with HiOutlineTrash */}
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-form-bg p-6 border border-form-border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-standard-800 mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-text-form-label mb-1">Product Price</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-standard-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="productPrice"
                    className="block w-full rounded-md border-input-border pl-7 pr-16 py-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <img src="https://flagcdn.com/w20/ps.webp" alt="Palestine Flag" className="h-4 w-6 rounded-sm" />
                    {/* Replaced SVG with HiOutlineChevronDown */}
                    <HiOutlineChevronDown className="w-4 h-4 ml-1 text-gray-standard-400" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="discountedPrice" className="block text-sm font-medium text-text-form-label mb-1">Discounted Price (Optional)</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-standard-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="discountedPrice"
                    className="block w-full rounded-md border-input-border pl-7 pr-3 py-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-text-form-label mb-1">Tax Included</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="taxYes"
                      name="taxIncluded"
                      type="radio"
                      className="h-4 w-4 text-brand-green border-input-border focus:ring-brand-green"
                      value="yes"
                      checked={taxIncluded === 'yes'}
                      onChange={(e) => setTaxIncluded(e.target.value)}
                    />
                    <label htmlFor="taxYes" className="ml-2 block text-sm text-gray-standard-900">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="taxNo"
                      name="taxIncluded"
                      type="radio"
                      className="h-4 w-4 text-brand-green border-input-border focus:ring-brand-green"
                      value="no"
                      checked={taxIncluded === 'no'}
                      onChange={(e) => setTaxIncluded(e.target.value)}
                    />
                    <label htmlFor="taxNo" className="ml-2 block text-sm text-gray-standard-900">No</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-form-label bg-gray-standard-100 p-2 rounded-md">
                <span className="font-semibold text-brand-green-dark">$5</span>
                <span>Sale = $10.00</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-text-form-label mb-1">Expiration</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    id="startDate"
                    placeholder="Start"
                    className="block w-full rounded-md border-input-border pl-3 pr-10 py-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                    value="Start" // Static for now, can be state
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {/* Replaced SVG with HiOutlineCalendar */}
                    <HiOutlineCalendar className="w-5 h-5 text-gray-standard-400" />
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
                    className="block w-full rounded-md border-input-border pl-3 pr-10 py-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                    value="End" // Static for now, can be state
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {/* Replaced SVG with HiOutlineCalendar */}
                    <HiOutlineCalendar className="w-5 h-5 text-gray-standard-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-form-bg p-6 border border-form-border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-standard-800 mb-4">Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="stockQuantity" className="block text-sm font-medium text-text-form-label mb-1">Stock Quantity</label>
                <input
                  type="text"
                  id="stockQuantity"
                  className="w-full border border-input-border rounded-md shadow-sm p-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  disabled={isUnlimited}
                />
              </div>
              <div>
                <label htmlFor="stockStatus" className="block text-sm font-medium text-text-form-label mb-1">Stock Status</label>
                <select
                  id="stockStatus"
                  className="w-full border border-input-border rounded-md shadow-sm p-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
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
                  <div className={`block w-10 h-6 rounded-full ${isUnlimited ? 'bg-brand-green' : 'bg-gray-standard-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isUnlimited ? 'translate-x-full' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-standard-700 text-sm">Unlimited</div>
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
                  <div className={`block w-10 h-6 rounded-full ${highlightFeatured ? 'bg-brand-green' : 'bg-gray-standard-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${highlightFeatured ? 'translate-x-full' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-standard-700 text-sm">Highlight this product in a featured section.</div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Upload Product Image, Categories */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Product Image */}
          <div className="bg-form-bg p-6 border border-form-border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-standard-800 mb-4">Upload Product Image</h2>
            <p className="text-sm text-gray-standard-700 mb-3">Product Image</p>
            <div className="border border-input-border rounded-lg overflow-hidden mb-4">
              {/* Image preview placeholder - add an actual image or placeholder here */}
              <div className="w-full h-32 bg-gray-standard-100 flex items-center justify-center text-gray-standard-500">
                No image selected
              </div>
            </div>
            <div className="flex space-x-3 mb-4">
              <button className="flex-1 px-4 py-2 border border-input-border rounded-md text-gray-standard-700 text-sm hover:bg-gray-standard-50">
                Browse
              </button>
              <button className="flex-1 px-4 py-2 border border-input-border rounded-md text-red-600 text-sm hover:bg-gray-standard-50">
                Replace
              </button>
            </div>
            <div className="flex flex-col items-center justify-center border border-dashed border-input-border rounded-lg p-6 text-gray-standard-500 cursor-pointer hover:border-brand-green hover:text-brand-green transition-colors">
              {/* Replaced SVG with HiOutlinePhoto */}
              <HiOutlinePhoto className="w-8 h-8 mb-2" />
              <span>Add Image</span>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-form-bg p-6 border border-form-border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-standard-800 mb-4">Categories</h2>
            <div className="mb-4">
              <label htmlFor="productCategories" className="block text-sm font-medium text-text-form-label mb-1">Product Categories</label>
              <select
                id="productCategories"
                className="w-full border border-input-border rounded-md shadow-sm p-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
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
              <label htmlFor="productTag" className="block text-sm font-medium text-text-form-label mb-1">Product Tag</label>
              <select
                id="productTag"
                className="w-full border border-input-border rounded-md shadow-sm p-2 text-text-input text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
              >
                <option>Select your product</option>
                <option>New Arrivals</option>
                <option>Best Sellers</option>
                <option>On Sale</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-form-label mb-2">Select Pot color</label>
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full border border-input-border bg-gray-standard-100 hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border border-input-border bg-yellow-300 hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border border-input-border bg-red-300 hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border border-input-border bg-gray-standard-600 hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border border-input-border bg-black hover:scale-105 transition-transform"></button>
                <button className="w-8 h-8 rounded-full border-2 border-brand-green text-brand-green flex items-center justify-center hover:bg-brand-green-50 transition-colors">
                  {/* Replaced SVG with HiOutlinePlus */}
                  <HiOutlinePlus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-form-label mb-2">Select Pot Sizes</label>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-input-border rounded-md text-gray-standard-700 text-sm hover:bg-gray-standard-100">S</button>
                <button className="px-4 py-2 border border-input-border rounded-md text-gray-standard-700 text-sm hover:bg-gray-standard-100">M</button>
                <button className="px-4 py-2 border border-input-border rounded-md text-gray-standard-700 text-sm hover:bg-gray-standard-100">XL</button>
                <button className="px-4 py-2 border-2 border-brand-green text-brand-green rounded-md text-sm flex items-center justify-center hover:bg-brand-green-50 transition-colors">
                  {/* Replaced SVG with HiOutlinePlus */}
                  <HiOutlinePlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons (Mobile/Smaller Screens) - If needed, based on typical form patterns */}
      {/* Note: These buttons are duplicates for smaller screens or specific layouts. */}
      {/* I've kept them as they were, just updated Tailwind classes and removed SVGs. */}
      <div className="mt-6 flex justify-end space-x-3">
        <button className="px-4 py-2 border border-input-border rounded-lg text-gray-standard-700 font-medium hover:bg-gray-standard-50">Save to draft</button>
        <button className="px-4 py-2 bg-brand-green text-white rounded-lg font-medium hover:bg-brand-green-hover">Publish Product</button>
      </div>
    </div>
  );
}

export default AddNewProductForm;