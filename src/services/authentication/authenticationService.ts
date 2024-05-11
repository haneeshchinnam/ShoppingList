import { ILoginPayload, ILoginResponse, IRegisterPayload } from "../../interface/authentication";
import { apiSlice } from "../apiSlice";
import { API_ENDPOINTS } from "../apiEndpoints";

const authenticationService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.session.login,
                method: 'POST',
                body: payload,
            })
        }),
        register: builder.mutation<{ message: string }, IRegisterPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.session.register,
                method: 'POST',
                body: payload,
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authenticationService;