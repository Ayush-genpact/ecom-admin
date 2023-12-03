import { gql } from "@apollo/client";

export const delete_Category = gql`
  mutation Mutation($deleteCategoryId: ID) {
    deleteCategory(id: $deleteCategoryId)
  }
`;

export const create_Category = gql`
  mutation Mutation($categoryInput: CategoryInput) {
    createCategory(categoryInput: $categoryInput)
  }
`;

export const create_Subcategory = gql`
  mutation AddSubCategory(
    $categoryId: ID
    $subCategoryInput: SubCategoryInput
  ) {
    addSubCategory(categoryId: $categoryId, subCategoryInput: $subCategoryInput)
  }
`;

export const delete_SubCategory = gql`
  mutation Mutation($categoryId: ID, $deleteSubCategoryId: ID) {
    deleteSubCategory(categoryId: $categoryId, id: $deleteSubCategoryId)
  }
`;
