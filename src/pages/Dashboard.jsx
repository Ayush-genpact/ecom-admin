import React, { useState } from "react";
import Product from "../components/Product";
import { gql, useQuery } from "@apollo/client";
export const Get_Product = gql`
  query GetProduct {
    getProducts {
      _id
      name
      brand
      images
      variants {
        variant
        price
      }
      category
      subcategory
      gst
      description
    }
  }
`;
const Dashboard = () => {
  const { loading, error, data } = useQuery(Get_Product);

  if (loading) return "Loading";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="flex flex-wrap justify-center mt-5">
        {data.getProducts.map((details) => {
          return <Product details={details} />;
        })}
      </div>
    </>
  );
};

export default Dashboard;
