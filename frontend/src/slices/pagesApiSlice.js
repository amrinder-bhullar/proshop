import { apiSlice } from "./apiSlice";
import { PAGES_URL } from "../constants";
export const pagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPages: builder.query({
      query: () => ({
        url: PAGES_URL,
      }),
      providesTags: ["Pages"],
      keepUnusedDataFor: 5,
    }),
    getPageById: builder.query({
      query: (pageId) => ({
        url: `${PAGES_URL}/${pageId}`,
      }),
      providesTags: ["Page"],
      keepUnusedDataFor: 5,
    }),
    getPageByUrl: builder.query({
      query: (url) => ({
        url: `${PAGES_URL}/url/${url}`,
      }),
      providesTags: ["Page"],
      keepUnusedDataFor: 5,
    }),
    addPage: builder.mutation({
      query: (data) => ({
        url: PAGES_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Pages"],
    }),
    updatePage: builder.mutation({
      query: (data) => ({
        url: `${PAGES_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Pages"],
    }),
  }),
});

export const {
  useGetPagesQuery,
  useAddPageMutation,
  useGetPageByIdQuery,
  useUpdatePageMutation,
  useGetPageByUrlQuery,
} = pagesApiSlice;
