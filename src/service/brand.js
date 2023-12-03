import { gql } from "@apollo/client";

export const delete_Brand = gql`
  mutation deleteBrand($deleteBrandId: ID) {
    deleteBrand(id: $deleteBrandId)
  }
`;

export const create_Brand = gql`
  mutation createBrand($brandInput: BrandInput) {
    createBrand(brandInput: $brandInput)
  }
`;


