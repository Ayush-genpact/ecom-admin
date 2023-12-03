import React, { useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Get_Product } from "./Dashboard";

export const Add_Product = gql`
  mutation AddProduct($productInput: ProductInput) {
    createProduct(productInput: $productInput)
  }
`;

export const get_Brands = gql`
  query query {
    getBrands {
      name
      _id
    }
  }
`;

export const get_Categories = gql`
  query query {
    getCategories {
      _id
      name
      subCategories {
        _id
        name
      }
    }
  }
`;

const ProductForm = () => {
  const [details, setDetails] = useState({
    images: [],
    variants: [],
  });
  const [createProduct, { loading, error }] = useMutation(Add_Product, {
    update: (cache, { data: { createProduct } }) => {
      const { getProducts } = cache.readQuery({ query: Get_Product });
      cache.writeQuery({
        query: Get_Product,
        data: { getProducts: [...getProducts, createProduct] },
      });
    },
  });
  const [variant, setVariant] = useState("");
  const [price, setPrice] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleVariantChange = (e) => {
    setVariant(e.target.value);
    setSelectedVariant(e.target.value);
  };

  const handleAddVariant = () => {
    if (variant && price) {
      setDetails({
        ...details,
        variants: [...details.variants, { variant, price }],
      });
      setVariant("");
      setPrice("");
      setSelectedVariant(null);
    }
  };
  const handleRemove = (variantToRemove) => {
    const updatedVariants = details.variants.filter(
      (variant) => variant !== variantToRemove
    );
    setDetails({ ...details, variants: updatedVariants });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setDetails({
        ...details,
        images: [...details.images, e.target.value],
      });
      e.target.value = "";
    }
  };

  const handleURLRemove = (urlremove) => {
    const updatedurls = details.images.filter((url) => url !== urlremove);
    setDetails({ ...details, images: updatedurls });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    await createProduct({
      variables: {
        productInput: {
          category: details.category,
          subcategory: details.subcategory,
          brand: details.brand,
          name: details.name,
          gst: details.gst,
          images: details.images,
          variants: details.variants,
          description: details.description,
        },
      },
    });

    setDetails({
      name: "",
      brand: "",
      category: "",
      subcategory: "",
      description: "",
      images: [],
      gst: "",
      variants: [],
    });
  };
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(get_Categories);
  const {
    loading: brandsLoading,
    error: brandsError,
    data: brandsData,
  } = useQuery(get_Brands);

  if (categoriesLoading || brandsLoading) return <p>Loading...</p>;
  if (categoriesError || brandsError) return <p>Error :</p>;
  return (
    <>
      <div className="w-full  flex justify-center mt-5">
        <div className="">
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
                value={details.name}
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
                  value={details.brand}
                  onChange={handleChange}
                >
                  {brandsData.getBrands.map((val) => (
                    <option value={val.name}>{val.name}</option>
                  ))}
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
                {details.images.map((url) => {
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
                    value={details.gst}
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
                  value={details.category}
                  onChange={handleChange}
                >
                  {categoriesData.getCategories.map((category, index) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
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
                  value={details.subcategory}
                  onChange={handleChange}
                >
                  {details.category ? (
                    categoriesData.getCategories
                      .find((category) => category.name === details.category)
                      .subCategories.map((subcat, ind) => (
                        <option value={subcat.name}>{subcat.name}</option>
                      ))
                  ) : (
                    <option value="Shoes">Shoes</option>
                  )}
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
                  name="variant"
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
                    value={price}
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
            {details.variants.map((variant) => {
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
                value={details.description}
                placeholder="Tell more about product"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end  text-white font-semibold">
            <button
              className="inline-block bg-purple p-2 rounded px-3"
              type="submit"
              onClick={handleClick}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
