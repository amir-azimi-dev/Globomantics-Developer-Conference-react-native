import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { api } from "../graphql/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const UseAppDispatch = useDispatch.withTypes<AppDispatch>;

export default store;