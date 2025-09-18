import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("http://127.0.0.1:4000/graphql");

export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({ client }),
    endpoints: build => ({})
});