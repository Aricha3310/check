import { ADD_PAGE_CLEAR, ADD_PAGE_FAILED, ADD_PAGE_FETCHING, ADD_PAGE_SUCCESS } from "../Constants";
import { ProductDetails } from "../types/product.type";

export const setAddFetchingToState = () => ({
    type: ADD_PAGE_FETCHING,
  });
  
  export const setAddSuccessToState = (payload: ProductDetails[]) => ({
    type: ADD_PAGE_SUCCESS,
    payload,
  });
  
  export const setAddFailedToState = () => ({
    type: ADD_PAGE_FAILED,
  });
  
  export const setAddClearToState = () => ({
    type:ADD_PAGE_CLEAR,
  });