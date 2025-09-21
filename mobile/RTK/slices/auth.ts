import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthPayload } from "../graphql/generated";
import { stat } from "fs";

type Auth = {
    user: AuthPayload["user"] | null;
    token: string | null;
};

const slice = createSlice({
    name: "auth",
    initialState: { user: null, token: null } as Auth,
    reducers: {
        updateCredentials: (state, action: PayloadAction<AuthPayload>) => {
            state.token = action.payload.token || null;
            state.user = action.payload.user || null;
        },

        removeCredentials: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { updateCredentials, removeCredentials } = slice.actions;
export default slice.reducer;