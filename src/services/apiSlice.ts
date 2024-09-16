import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetBaseUrl } from "../shared/helper";
import { API_ENDPOINTS } from './apiEndpoints';
import { setAccessToken, setRefresh } from './authentication/authSlice';
import { ILoginResponse } from '../interface';

const BASE_URL = GetBaseUrl();

// Base query function with token access logic
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

// Base query function with token refresh logic
const baseRefreshQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('refreshToken');
        console.log("refresh", accessToken);
        
        if (accessToken) {
            headers.set('refreshToken', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithTokenRefresh = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);

    console.log("result", result, result?.meta?.response?.status);
    

    if (result?.meta?.response?.status === 401) {
        // Refresh Access Token
        try {
            const response = await baseRefreshQuery({ url: API_ENDPOINTS.session.refreshToken, method: 'GET' }, api, extraOptions);

        console.log("response", response);


        if (!response?.error?.status) {
            const loginResponse = response.data as ILoginResponse;
            // Store the new token
            api.dispatch(setAccessToken(loginResponse.accessToken));
            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(setRefresh(response.error?.data === undefined));
        }
        } catch (error) {
            console.log("error", error);
            
        }
    }
    return result;
}

// Create API slice
export const apiSlice = createApi({
    baseQuery: baseQueryWithTokenRefresh,
    endpoints: (builder) => ({}),
});
