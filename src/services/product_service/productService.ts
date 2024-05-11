import { IConfig, IProduct, IProductResponse, IUpdateProduct } from "../../interface";
import { API_ENDPOINTS } from "../apiEndpoints";
import { apiSlice } from "../apiSlice";

const productService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductResponse[], void>({
      query: () => API_ENDPOINTS.product.products,
    }),
    addProduct: builder.mutation<{ meassage: string }, IProduct>({
      query: (payload) => ({
        url: API_ENDPOINTS.product.products,
        method: "POST",
        body: payload,
      }),
    }),
    updateProduct: builder.mutation<
      { message: string },
      { productId: string; product: IUpdateProduct }
    >({
      query: (payload) => ({
        url: API_ENDPOINTS.product.product(payload.productId),
        method: "PUT",
        body: payload.product,
      }),
    }),
    deleteProduct: builder.mutation<{ message: string }, { productId: string }>(
      {
        query: (payload) => ({
          url: API_ENDPOINTS.product.product(payload.productId),
          method: "DELETE",
        }),
      }
    ),
    getCategories: builder.query<IConfig[], void>({
        query: () => API_ENDPOINTS.product.category,
    }),
    postCategory: builder.mutation<{ message: string }, IConfig>({
        query: (payload) => ({
            url: API_ENDPOINTS.product.category,
            method: 'POST',
            body: payload,
        })
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  usePostCategoryMutation,
} = productService;
