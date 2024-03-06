import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice.js"
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedUserReducer = persistReducer(authPersistConfig, authReducer);

// const adminPersistConfig = {
//   key: "admin",
//   storage,
// };

// const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);

// const vendorPersistConfig = {
//   key: "vendor",
//   storage,
// };


// const persistedVendorReducer = persistReducer(
//   vendorPersistConfig,
//   vendorReducer
// );


// const agentPersistConfig = {
//   key: "agent",
//   storage,
// };


// const persistedAgentReducer = persistReducer(
//   agentPersistConfig,
//   agentReducer
// );


// const productPersistConfig = {
//   key: "product",
//   storage,
// };

// const persistedProductReducer = persistReducer(
//   productPersistConfig,
//   productReducer
// );

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    // admin: persistedAdminReducer,
    // vendor: persistedVendorReducer,
    // agent: persistedAgentReducer,
    // product: persistedProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// export  = ReturnType<typeof store.getState>;
// export   store.dispatch;
// export const persistor = persistStore(store);