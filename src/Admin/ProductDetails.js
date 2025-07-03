// src/page/admin/ProductDetails.jsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../../context/ProductContext';
import AddNewProductForm from './AddNewProductForm';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const selectedProduct = products.find((p) => p.id.toString() === id);

  if (!selectedProduct) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Product not found
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-[#4B5929]">
        Edit Product: {selectedProduct.name}
      </h1>
      <AddNewProductForm product={selectedProduct} />
    </div>
  );
};

export default ProductDetails;
