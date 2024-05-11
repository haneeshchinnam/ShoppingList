import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetBaseUrl } from "../shared/helper";
import { API_ENDPOINTS } from './apiEndpoints';
import { logout, setAuthProfile } from './authentication/authSlice';
import { ILoginResponse } from '../interface';

const BASE_URL = GetBaseUrl();

// Base query function with token refresh logic
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithTokenRefresh = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        // Refresh Access Token
        const response = await baseQuery({ url: API_ENDPOINTS.session.refreshToken, method: 'GET' }, api, extraOptions);

        if (response?.data) {
            const loginResponse = response.data as ILoginResponse;
            // Store the new token
            api.dispatch(setAuthProfile(loginResponse));
            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout()); // Logout the user on Refresh Token failure
            api.dispatch(apiSlice.util.resetApiState());
        }
    }
    return result;
}

// Create API slice
export const apiSlice = createApi({
    baseQuery: baseQueryWithTokenRefresh,
    endpoints: (builder) => ({}),
});
