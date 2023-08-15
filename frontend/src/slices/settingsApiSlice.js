import { apiSlice } from "./apiSlice";
import { SETTINGS_URL } from "../constants";
export const settingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSlides: builder.query({
      query: () => ({
        url: `${SETTINGS_URL}/slider`,
      }),
      providesTags: ["Slides"],
      keepUnusedDataFor: 5,
    }),
    addSlide: builder.mutation({
      query: (data) => ({
        url: `${SETTINGS_URL}/slider`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Slides"],
    }),
    deleteSlide: builder.mutation({
      query: (slideId) => ({
        url: `${SETTINGS_URL}/slider/${slideId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slides"],
    }),
    updateSlide: builder.mutation({
      query: (data) => ({
        url: `${SETTINGS_URL}/slider/${data.slideId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Slides"],
    }),
  }),
});

export const {
  useGetSlidesQuery,
  useAddSlideMutation,
  useDeleteSlideMutation,
  useUpdateSlideMutation,
} = settingsApiSlice;
