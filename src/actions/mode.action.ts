import { MODE_PAGE_CLEAR, MODE_PAGE_FAILED, MODE_PAGE_FETCHING, MODE_PAGE_SUCCESS, server } from "../Constants";
import { ProductDetails } from "../types/product.type";
import { httpClient } from "../utils/httpclient";

export const setModeFetchingToState = () => ({
    type: MODE_PAGE_FETCHING,
  });
  
  export const setModeSuccessToState = (payload: ProductDetails[]) => ({
    type: MODE_PAGE_SUCCESS,
    payload,
  });
  
  export const setModeFailedToState = () => ({
    type: MODE_PAGE_FAILED,
  });
  
  export const setModeClearToState = () => ({
    type: MODE_PAGE_CLEAR,
  });
  
  export const loadProduct = () => {
    return (dispath: any) => {
      dispath(setModeFetchingToState());
      doGetProducts(dispath);
    };
  };
  
  export const loadProductByKeyword = (id: any) => {
    return async (dispatch: any) => {
      dispatch(setModeFetchingToState());
  
      try {
        let result = await httpClient.get<any>(`${server.PRODUCT_URL}/${id}`);
        dispatch(setModeSuccessToState(result.data(0)));
      } catch {
        doGetProducts(dispatch);
      }
    };
  };
  
  const doGetProducts = async (dispatch: any) => {
    try {
      const result = await httpClient.get<ProductDetails[]>(server.PRODUCT_URL);
      dispatch(setModeSuccessToState(result.data));
      // console.log(result.data[0].title);
    } catch (error) {
      alert(error);
      dispatch(setModeFailedToState());
    }
  };