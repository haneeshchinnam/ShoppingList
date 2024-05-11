import { ICart, IUpdateCart } from "../../interface";
import { API_ENDPOINTS } from "../apiEndpoints";
import { apiSlice } from "../apiSlice";

const productService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<ICart[], void>({
            query: () => API_ENDPOINTS.cart.cart,
        }),
        updateCart: builder.mutation<{ message: string }, IUpdateCart>({
            query: (payload) => ({
                url: API_ENDPOINTS.cart.cart,
                method: 'PUT',
                body: payload,
            })
        }),
    })
});

export const { useGetCartQuery, useUpdateCartMutation } = productService
