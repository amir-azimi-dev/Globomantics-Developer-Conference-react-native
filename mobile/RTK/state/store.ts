import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { api } from "../graphql/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import createSecureStorage from "redux-persist-expo-securestore";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import authReducer from "../slices/auth";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "globomantics-auth",
    storage: createSecureStorage(),
    whiteList: ["auth"]
};

const persistedReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: persistReducer(persistConfig, authReducer)
});

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(api.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const UseAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;