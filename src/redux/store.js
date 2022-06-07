import { configureStore } from "@reduxjs/toolkit";
import userReducer from './_user';
import cartReducer from './_cart';
//Cắm slice vào store, 1 app chỉ có 1 store
export default configureStore({
  reducer: {
    userReducer,
    cartReducer,
  },
});
