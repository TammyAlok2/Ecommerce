import React from 'react';

const AddShop = () => {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-100 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="thumbnail" className="block text-gray-700 font-bold mb-2">
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                accept="image/*"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddShop;
