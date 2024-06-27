<<<<<<< HEAD
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import countryCodeReducer from "../features/countryCodeReducer";
import { productReducer } from "../features/getetProductReducer/index";
import userReducer from "../features/userReducer";
import carbonReducer from "../features/carbonReducer";
import cartReducer from "../features/cartReducer";
import profileReducer from "../features/profileReducer";

const reducer = combineReducers({
  auth: authReducer,
  country: countryCodeReducer,
  product: productReducer,
  user: userReducer,
  carbon: carbonReducer,
  cart: cartReducer,
  profile: profileReducer,
});
=======

import { combineReducers } from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authReducer'
import countryCodeReducer from '../features/countryCodeReducer'
import { productReducer } from '../features/getetProductReducer/index'
import userReducer from '../features/userReducer'
import carbonReducer from '../features/carbonReducer'
import cartReducer from '../features/cartReducer'
import profileReducer from '../features/profileReducer'
import  ChangeAddressFunc  from '../features/changeAddressReducer'



const reducer = combineReducers({
    auth:authReducer,
    country:countryCodeReducer,
    product:productReducer,
    user:userReducer,
    carbon:carbonReducer,
    cart:cartReducer,
    profile:profileReducer,
    address:ChangeAddressFunc 
})

>>>>>>> e01a94cc4bc975358aedbd4fba825b3b5eb03e65

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    }),
});

export default store;
