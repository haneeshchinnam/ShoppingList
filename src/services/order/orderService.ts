import { IOrder } from "../../interface/order";
import { API_ENDPOINTS } from "../apiEndpoints";
import { apiSlice } from "../apiSlice";

const productService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => API_ENDPOINTS.order.order,
    }),
    orderProduct: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: API_ENDPOINTS.order.order,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useOrderProductMutation } = productService;
