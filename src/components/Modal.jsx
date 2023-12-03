import React, { useState } from "react";
import { FiMinusCircle } from "react-icons/fi";

const Modal = ({ isOpen, onClose, onSave, initialData }) => {
  const [editedData, setEditedData] = useState(initialData);
  const [variant, setVariant] = useState("");
  const [price, setPrice] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRemove = (variantToRemove) => {
    const updatedVariants = editedData.variants.filter(
      (variant) => variant !== variantToRemove
    );
    setEditedData({ ...editedData, variants: updatedVariants });
  };
  const handleVariantChange = (e) => {
    setVariant(e.target.value);
    setSelectedVariant(e.target.value);
  };
  const handleAddVariant = () => {
    if (variant && price) {
      setEditedData({
        ...editedData,
        variants: [...editedData.variants, { variant, price }],
      });
      setVariant("");
      setPrice("");
      setSelectedVariant(null);
    }
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditedData({
        ...editedData,
        images: [...editedData.images, e.target.value],
      });
      e.target.value = "";
    }
  };
  const handleURLRemove = (urlremove) => {
    const updatedurls = editedData.images.filter((url) => url !== urlremove);
    setEditedData({ ...details, images: updatedurls });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md ">
        <h2 className="text-xl font-bold mb-4">Edit Data</h2>

        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Product Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              name="name"
              value={editedData.name}
              placeholder="Enter Product Name"
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-brand"
            >
              Brand
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-brand"
                name="brand"
                value={editedData.brand}
                onChange={handleChange}
              >
                <option value="PUMA">PUMA</option>
                <option value="Vishal">Vishal</option>
                <option value="H&M">H&M</option>
                <option value="Pantaloons">Pantaloons</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <div className="flex flex-wrap w-96 ">
              {editedData.images.map((url) => {
                return (
                  <span className="flex  border rounded p-2 m-1 text-sm justify-center items-center font-semibold  text-gray-500">
                    <span className="m-1 inline-bock w-8 h-8">
                      <img src={url} />
                    </span>
                    <span>
                      <FiMinusCircle
                        className=" cursor-pointer"
                        onClick={() => handleURLRemove(url)}
                      />
                    </span>
                  </span>
                );
              })}
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="images"
                >
                  Image Urls
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="images"
                  type="text"
                  name="images"
                  placeholder="urls"
                  value={editedData.images}
                  onKeyDown={handleKeyDown}
                />
                <p className="text-gray-600 text-xs italic">
                  Add multiple urls by pressing enter
                </p>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-gst"
                >
                  GST
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-gst"
                  type="text"
                  name="gst"
                  value={editedData.gst}
                  placeholder="Gst percent"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-category"
            >
              Categories
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-category"
                name="category"
                value={editedData.category}
                onChange={handleChange}
              >
                <option value="Kids">Kids</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Electronics">Electronics</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-subcategory"
            >
              Sub-Categories
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                id="grid-subcategory"
                name="subcategory"
                value={editedData.subcategory}
                onChange={handleChange}
              >
                <option value="Sarees">Sarees</option>
                <option value="Pants">Pants</option>
                <option value="Lowers">Lowers</option>
                <option value="Shirts">Shirts</option>
                <option value="Suits">Suits</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-variant"
            >
              Variant
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                id="grid-variant"
                name="variants"
                value={variant}
                onChange={handleVariantChange}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {selectedVariant && (
              <div className="mt-4">
                <input
                  type="text"
                  className="block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter Price"
                  name="price"
                  value={editedData.variants.price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleAddVariant}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          {editedData.variants.map((variant) => {
            return (
              <span className="flex border rounded p-2 m-1 text-sm justify-center items-center font-semibold  text-gray-500">
                <span className="m-1 ">
                  {variant.variant}-{variant.price}
                </span>
                <span>
                  <FiMinusCircle
                    className=" cursor-pointer"
                    onClick={() => handleRemove(variant)}
                  />
                </span>
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
              id="description"
              name="description"
              value={editedData.description}
              placeholder="Tell more about product"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
