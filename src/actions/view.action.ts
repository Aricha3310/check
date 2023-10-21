import { VIEW_PAGE_CLEAR, VIEW_PAGE_FAILED, VIEW_PAGE_FETCHING, VIEW_PAGE_SUCCESS } from "../Constants";
import { ProductDetails } from "../types/product.type";

export const setViewFetchingToState = () => ({
    type: VIEW_PAGE_FETCHING,
  });
  
  export const setViewSuccessToState = (payload: ProductDetails[]) => ({
    type: VIEW_PAGE_SUCCESS,
    payload,
  });
  
  export const setViewFailedToState = () => ({
    type: VIEW_PAGE_FAILED,
  });
  
  export const setViewClearToState = () => ({
    type:VIEW_PAGE_CLEAR,
  });
  
//   export const loadProduct = () => {
//     return (dispath: any) => {
//       dispath(setViewFetchingToState());
//       doGetProducts(dispath);
//     };
//   };
  
//   export const loadProductByKeyword = (id: any) => {
//     return async (dispatch: any) => {
//       dispatch(setViewFetchingToState());
  
//       try {
//         let result = await httpClient.get<any>(`${server.PRODUCT_URL}/${id}`);
//         dispatch(setViewSuccessToState(result.data(0)));
//       } catch {
//         doGetProducts(dispatch);
//       }
//     };
//   };