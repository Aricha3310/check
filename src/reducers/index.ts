import { combineReducers } from "redux";
import productReducer, { ProductState } from "./product.reducer";
import { SingleProductState } from "./singleproduct.reducer";
import singleProductReducer from "./singleproduct.reducer";

export default combineReducers({
    productReducer,
    singleProductReducer

});

export interface RootReducer {
    productReducer: ProductState;
    singleProductReducer: SingleProductState;
}