import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Modal from "./Modal";
import { gql, useMutation } from "@apollo/client";
import { MdDelete } from "react-icons/md";
import { Get_Product } from "../pages/Dashboard";
const update_Product = gql`
  mutation updateProduct($updateProductId: ID, $productInput: ProductInput) {
    updateProduct(id: $updateProductId, productInput: $productInput)
  }
`;

const delete_product = gql`
  mutation Mutation($deleteProductId: ID) {
    deleteProduct(id: $deleteProductId)
  }
`;
const Product = (props) => {
  console.log(props.details);
  const [updateProduct, { loading, error }] = useMutation(update_Product);
  const [deleteProduct] = useMutation(delete_product, {
    update: (cache, { data: { deleteProduct } }) => {
      const { getProducts } = cache.readQuery({ query: Get_Product });
      const newProducts = getProducts.filter(
        (product) => product._id !== deleteProduct
      );
      cache.writeQuery({
        query: Get_Product,
        data: { getProducts: newProducts },
      });
    },
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedData, setEditedData] = useState(props.details);
  const handleDelete = async () => {
    await deleteProduct({
      variables: {
        deleteProductId: props.details._id,
      },
    });
  };
  const handleModalSave = async (newData) => {
    console.log("Edited Data:", newData);
    setEditedData(newData);
    await updateProduct({
      variables: {
        updateProductId: props.details._id,
        productInput: {
          category: newData.category,
          subcategory: newData.subcategory,
          brand: newData.brand,
          name: newData.name,
          gst: newData.gst,
          images: newData.images,
          variants: newData.variants.map((v) => ({
            variant: v.variant,
            price: v.price,
          })),
          description: newData.description,
        },
      },
    });

    console.log("success");
  };
  return (
    <>
      <div className="max-w-sm rounded border overflow-hidden border-borderish w-[350px] m-1">
        <div className=" relative flex justify-center h-[230px]">
          <img
            className=" object-contain text-transparent w-full h-full"
            src={props.details.images[0]}
            alt=""
          />
        </div>
        <div className="p-3">
          <div>
            <span>
              <p className=" text-lg text-greyish my-2">{props.details.name}</p>
              <p className="text-xl font-bold flex items-baseline">
                <FaRupeeSign className="text-lg" />
                {props.details.variants[0].price}
                <span className="text-xs text-greyish font-medium mx-2">
                  onwards
                </span>
              </p>
            </span>
          </div>
          <div className="mt-2">
            <div className="border border-borderish rounded-2xl inline-block p-1 px-2 text-xs bg-tags  text-tagtext font-medium">
              Free Delivery
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <div className=" text-white bg-green-600 rounded-2xl font-semibold inline-block py-1 px-2">
              <span className="flex justify-center items-center tracking-wider">
                4.1
                <CiStar />
              </span>
            </div>
            <div className="p-2 flex justify-center  text-greyish text-sm font-semibold">
              2277 Reviews
            </div>

            <div className="flex">
              <FaEdit onClick={() => setModalOpen(true)} />
              <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleModalSave}
                initialData={editedData}
              />
              <MdDelete
                onClick={handleDelete}
                className="cursor-pointer ml-8"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
