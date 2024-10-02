import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    checkingAuth: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
        },
        authFailure: (state) => {
            state.loading = false;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        logoutStart: (state) => {
            state.loading = true;
        },
        logOutFailure: (state) => {
            state.loading = false;
        },
        logOutSuccess: (state) => {
            state.loading = false;
            state.user = null;
        },
        startCheckingAuth: (state) => {
            state.checkingAuth = true
        },
        stopCheckingAuth: (state) => {
            state.checkingAuth = false
        },
        refreshTokenFailure: (state) => {
            state.user = null,
            state.checkingAuth = false
        }
    },
});

export const { authStart, authFailure, authSuccess, logoutStart, logOutFailure, logOutSuccess, startCheckingAuth, stopCheckingAuth, refreshTokenFailure } = userSlice.actions;

export default userSlice.reducer;