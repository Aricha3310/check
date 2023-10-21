import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { Provider, useDispatch } from "react-redux";

// let middlewares: Middleware[] = [thunk];
// const reducer = {
//   reducers: rootReducer,
// };

// if (true || process.env.REACT_APP_IS_PRODUTION != "1") {
//   middlewares.push(logger);
// }
export const store = configureStore({ reducer:rootReducer });
// export const navigate = useNavigate();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  
  <BrowserRouter>
  
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
