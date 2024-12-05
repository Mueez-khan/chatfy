import { combineReducers } from "@reduxjs/toolkit";
import userAuthSlice from "../slices/authSlice";
import  userOnline  from "../slices/userOnline";

const rootReducer = combineReducers({

   "auth" : userAuthSlice,
   "userOnline" : userOnline


})

export default rootReducer;