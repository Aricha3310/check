import {
  PRODUCT_CLEAR,
  PRODUCT_FETCHING,
  PRODUCT_FAILED,
  PRODUCT_SUCCESS,
} from "../Constants";
import { ProductDetails } from "../types/product.type";

export interface ProductState {
  result: ProductDetails[];
  isFetching: boolean;
  isError: boolean;
}

const initialState: ProductState = {
  result: [],
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case PRODUCT_FETCHING:
      return { ...state, result: [], isFetching: true, isError: false };
    case PRODUCT_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case PRODUCT_FAILED:
      return { ...state, result: [], isFetching: false, isError: true };
    case PRODUCT_CLEAR:
      return { ...state, result: [], isFetching: false, isError: false };
    default:
      return state;
  }
};
