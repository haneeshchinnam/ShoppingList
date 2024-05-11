import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse } from "../../interface/authentication";

const initialState: ILoginResponse = {
    accessToken: null,
    refreshToken: null,
    user: null
}

// Define authentication slice
const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setAuthProfile: (state, action: PayloadAction<ILoginResponse>) => {
            const user = action.payload;
            state.accessToken = user.accessToken;
            state.refreshToken = user.refreshToken;
            state.user = user.user;
            localStorage.setItem('accessToken', user.accessToken || ''); // Store access token in localStorage
            localStorage.setItem('refreshToken', user.refreshToken || ''); // Store refresh token in localStorage
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            localStorage.removeItem('accessToken'); // Remove access token from localStorage
            localStorage.removeItem('refreshToken'); // Remove refresh token from localStorage
        }
    }
});

// Export actions and reducer
export const { setAuthProfile, logout } = authSlice.actions;
export default authSlice.reducer;