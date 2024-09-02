import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// 1- Create a root reducer:
const rootReducer = combineReducers({
  user: userReducer,
});

// 2- configure store
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // MiddleWare to prevent default error in redux:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
