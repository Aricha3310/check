import {
  PRODUCT_CLEAR,
  PRODUCT_FAILED,
  PRODUCT_FETCHING,
  PRODUCT_SUCCESS,
  server,
} from "../Constants";
import { ProductDetails } from "../types/product.type";
import { httpClient } from "../utils/httpclient";

export const setProductFetchingToState = () => ({
  type: PRODUCT_FETCHING,
});

export const setProductSuccessToState = (payload: ProductDetails[]) => ({
  type: PRODUCT_SUCCESS,
  payload,
});

export const setProductFailedToState = () => ({
  type: PRODUCT_FAILED,
});

export const setProductClearToState = () => ({
  type: PRODUCT_CLEAR,
});

export const loadProduct = () => {
  return (dispath: any) => {
    dispath(setProductFetchingToState());
    doGetProducts(dispath);
  };
};

export const loadProductByKeyword = (id: any) => {
  return async (dispatch: any) => {
    dispatch(setProductFetchingToState());

    try {
      let result = await httpClient.get<any>(`${server.PRODUCT_URL}/${id}`);
      dispatch(setProductSuccessToState(result.data(0)));
    } catch {
      doGetProducts(dispatch);
    }
  };
};

const doGetProducts = async (dispatch: any) => {
  try {
    const result = await httpClient.get<ProductDetails[]>(server.PRODUCT_URL);
    dispatch(setProductSuccessToState(result.data));
    // console.log(result.data[0].title);
  } catch (error) {
    alert(error);
    dispatch(setProductFailedToState());
  }
};
