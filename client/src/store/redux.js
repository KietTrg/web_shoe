import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import productSlice from "./products/productSlice";
// import categorySlice from "./categorys/categorySlice";
import userSlice from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
const commonConfig = {
  key: "shop/user",
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "current", "currentCart"],
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
    // category: categorySlice,
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
