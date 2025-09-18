import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
    schema: "http://127.0.0.1:4000/graphql",
    documents: "./RTK/graphql/**/*.graphql",
    generates: {
        "./RTK/graphql/generated.ts": {
            plugins: [
                "typescript",
                "typescript-resolvers",
                {
                    "typescript-rtk-query": {
                        importBaseApiFrom: "./baseApi",
                        exportHooks: true,
                        overrideExisting: true
                    },
                },
            ],
        },
        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    },
};

export default config;