import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";
import { Platform } from "react-native";
import { RootState } from "../state/store";

const hostname = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
export const client = new GraphQLClient(`http://${hostname}:4000/graphql`);

export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        client,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            token && headers.set("Authorization", token);

            return headers;
        }
    }),
    endpoints: build => ({})
});