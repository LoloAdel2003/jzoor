import React from 'react'
// import { AddNewProduct } from './components/AddNewProduct'
import AddNewProductForm from './components/AddNewProductForm'

const AdminAdd = () => {
  return (
    <div className="p-4 bg-[#F3F4F6]">
              <h1 className="text-xl font-semibold text-gray-800">Add New Product</h1>

      <AddNewProductForm />
    </div>
  )
}

export default AdminAdd
