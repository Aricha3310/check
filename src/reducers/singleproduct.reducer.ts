import {
  SINGLE_PRODUCT_FETCHING,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAILED,
  SINGLE_PRODUCT_CLEAR,
} from "../Constants";
import { ProductDetails } from "../types/product.type";

export interface SingleProductState {
  result: ProductDetails | null;
  isFetching: boolean;
  isError: boolean;
}

const initialState: SingleProductState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SINGLE_PRODUCT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case SINGLE_PRODUCT_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case SINGLE_PRODUCT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case SINGLE_PRODUCT_CLEAR:
      return { ...state, result: null, isFetching: false, isError: false };
    default:
      return state;
  }
};
