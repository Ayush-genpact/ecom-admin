import React, { useEffect, useState } from "react";
import { create_Brand, delete_Brand } from "../service/brand.js";
import {
  create_Category,
  delete_Category,
  create_Subcategory,
  delete_SubCategory,
} from "../service/category.js";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

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
const AddUtils = () => {
  const [brand, setBrand] = useState("");
  const [categry, setCategry] = useState("");
  const [subCatgry, setSubCategry] = useState("");
  const [createBrand] = useMutation(create_Brand, {
    update: (cache, { data: { createBrand } }) => {
      const { getBrands } = cache.readQuery({ query: get_Brands });
      cache.writeQuery({
        query: get_Brands,
        data: { getBrands: [...getBrands, createBrand] },
      });
    },
  });
  const [deleteBrand] = useMutation(delete_Brand, {
    update: (cache, { data: { deleteBrand } }) => {
      const { getBrands } = cache.readQuery({ query: get_Brands });
      const updatedBrands = getBrands.filter(
        (brand) => brand._id !== deleteBrand
      );
      cache.writeQuery({
        query: get_Brands,
        data: { getBrands: updatedBrands },
      });
    },
  });
  const [createCategory] = useMutation(create_Category);
  const [deleteCategory] = useMutation(delete_Category);
  const [addSubCategory] = useMutation(create_Subcategory);
  const [deleteSubCategory] = useMutation(delete_SubCategory);

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
      <div className="m-2 w-1/3 mx-20">
        <div className=" mb-16">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-brand-name"
          >
            Add Brand
          </label>
          <div className="flex gap-5 justify-center items-center mb-3">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-brand-name"
              type="text"
              name="name"
              value={brand}
              placeholder="Enter Brand Name"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />

            <div
              className="border rounded bg-purple text-white font-semibold p-2 cursor-pointer"
              onClick={async () => {
                await createBrand({
                  variables: {
                    brandInput: {
                      name: brand,
                    },
                  },
                });
                setBrand("");
              }}
            >
              Add
            </div>
          </div>
          <div className="font-semibold ">
            Brands:
            <div className="flex">
              {brandsData.getBrands.map((val) => (
                <div className="border border-gray-100 p-2 m-1 flex gap-2 justify-center items-center text-gray-700">
                  {val.name}
                  <FiMinusCircle
                    onClick={async () => {
                      await deleteBrand({
                        variables: {
                          deleteBrandId: val._id,
                        },
                      });
                    }}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-16">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="category"
          >
            Add Category
          </label>
          <div className="flex gap-5 justify-center items-center mb-3">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="category"
              type="text"
              name="name"
              value={categry}
              placeholder="Enter Category Name"
              onChange={(e) => {
                setCategry(e.target.value);
              }}
            />
            <div
              className="border rounded bg-purple text-white font-semibold p-2 cursor-pointer"
              onClick={async () => {
                await createCategory({
                  variables: {
                    categoryInput: {
                      name: categry,
                    },
                  },
                });
                setCategry("");
              }}
            >
              Add
            </div>
          </div>
          <div className="flex ">
            <div className="font-semibold ">
              Categories:
              <div className="col-span-6 flex flex-col  ">
                {categoriesData.getCategories.map((category, index) => (
                  <>
                    <div key={index} className="flex items-center">
                      <div className="mr-20 flex p-1 m-1 border justify-center items-center gap-2 border-gray-100">
                        {category.name}
                        <FiMinusCircle
                          onClick={async () => {
                            await deleteCategory({
                              variables: {
                                deleteCategoryId: category._id,
                              },
                            });
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                      {category.subCategories.map((subcat, ind) => (
                        <div
                          key={ind}
                          className="flex p-1 m-1 border justify-center items-center gap-2 border-gray-100"
                        >
                          {subcat.name}
                          <FiMinusCircle
                            onClick={async () => {
                              await deleteSubCategory({
                                variables: {
                                  categoryId: category._id,
                                  deleteSubCategoryId: subcat._id,
                                },
                              });
                            }}
                            className="cursor-pointer"
                          />
                        </div>
                      ))}
                      <SubcatCard
                        catId={category._id}
                        addSubCategory={addSubCategory}
                      />
                      {/* <div className="flex justify-center items-center bg-gray-200">
                        <input
                          className="block w-20 bg-gray-200  text-gray-700 text-sm border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                          id="category"
                          type="text"
                          name="name"
                          value={subCatgry}
                          onChange={(e) => {
                            setSubCategry(e.target.value);
                          }}
                        />
                        <FiPlusCircle
                          className="m-1 cursor-pointer"
                          onClick={async () => {
                            await addSubCategory({
                              variables: {
                                categoryId: category._id,
                                subCategoryInput: {
                                  name: subCatgry,
                                },
                              },
                            });
                            setSubCategry("");
                          }}
                        />
                      </div> */}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUtils;

const SubcatCard = ({ catId, addSubCategory }) => {
  const [subcat, setSubcat] = useState("");
  return (
    <>
      <div className="flex justify-center items-center bg-gray-200">
        <input
          className="block w-20 bg-gray-200  text-gray-700 text-sm border rounded p-1 leading-tight focus:outline-none focus:bg-white"
          id="category"
          type="text"
          name="name"
          value={subcat}
          onChange={(e) => {
            setSubcat(e.target.value);
          }}
        />
        <FiPlusCircle
          className="m-1 cursor-pointer"
          onClick={async () => {
            await addSubCategory({
              variables: {
                categoryId: catId,
                subCategoryInput: {
                  name: subcat,
                },
              },
            });
            setSubcat("");
          }}
        />
      </div>
    </>
  );
};
