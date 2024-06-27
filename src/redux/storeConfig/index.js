import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import countryCodeReducer from "../features/countryCodeReducer";
import { productReducer } from "../features/getetProductReducer/index";
import userReducer from "../features/userReducer";
import carbonReducer from "../features/carbonReducer";
import cartReducer from "../features/cartReducer";
import profileReducer from "../features/profileReducer";
import ChangeAddressFunc from "../features/changeAddressReducer";
import logger from "redux-logger";

const reducer = combineReducers({
  auth: authReducer,
  country: countryCodeReducer,
  product: productReducer,
  user: userReducer,
  carbon: carbonReducer,
  cart: cartReducer,
  profile: profileReducer,
  address: ChangeAddressFunc,
});

const thunkResponseLogger = (storeAPI) => (next) => async (action) => {
  if (typeof action === "function") {
    const result = await action(storeAPI.dispatch, storeAPI.getState);
    console.log("Thunk action result:", result);
    return result;
  }
  return next(action);
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkResponseLogger,logger),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    }),
});

export default store;
