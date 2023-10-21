import {
  SINGLE_PRODUCT_FETCHING,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAILED,
  SINGLE_PRODUCT_CLEAR,
  server,
} from "../Constants";
import { ProductDetails } from "../types/product.type";
import { httpClient } from "../utils/httpclient";

export const setSingleProductFetchingToState = () => ({
  type: SINGLE_PRODUCT_FETCHING,
});

export const setSingleProductSuccessToState = (payload: ProductDetails) => ({
  type: SINGLE_PRODUCT_SUCCESS,
  payload,
});

export const setSingleProductFailedToState = () => ({
  type: SINGLE_PRODUCT_FAILED,
});

export const setSingleProductClearToState = () => ({
  type: SINGLE_PRODUCT_CLEAR,
});

export const loadProductById = (id: any) => {
  return async (dispatch: any) => {
    dispatch(setSingleProductFetchingToState());
    console.log("1");
    try {
      let result = await httpClient.get<ProductDetails>(
        `${server.PRODUCT_URL}/${id}`
      );
      dispatch(setSingleProductSuccessToState(result.data));
      console.log("2");
      console.log(result.data.title);
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setSingleProductFailedToState());
    }
  };
};
