import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductDetails = () => {
  const { selectedProduct } = useContext(ProductContext);

  if (!selectedProduct) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No product selected.
      </div>
    );
  }

  return (
    <section className="bg-[#fdf9f3] min-h-screen py-16 px-4 md:px-20 pt-[120px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-6 md:p-10 rounded-2xl shadow-lg">
        
        {/* صورة المنتج */}
        <div>
          <img
            src={selectedProduct.img}
            alt={selectedProduct.name}
            className="w-full h-[400px] object-cover rounded-xl shadow"
          />
        </div>

        {/* معلومات المنتج */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-[#4B5929]">
            {selectedProduct.name}
          </h2>

          <p className="text-[#af926a] text-2xl font-semibold">
            ${selectedProduct.new_price}
          </p>

          <p className="text-gray-600 text-base leading-relaxed">
            {selectedProduct.description}
          </p>

          <button
            className="mt-4 w-full md:w-auto bg-[#af926a] text-white px-6 py-2 rounded-full hover:bg-[#8B6F47] transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
