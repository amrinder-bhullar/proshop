import { apiSlice } from "./apiSlice";
import { CHAT_URL } from "../constants";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: CHAT_URL,
        method: "POST",
        body: data,
      }),
    }),
    getChatById: builder.query({
      query: (chatId) => ({
        url: `${CHAT_URL}/${chatId}`,
      }),
      providesTags: ["Chat"],
      keepUnusedDataFor: 5,
    }),
    getAllChatByUser: builder.query({
      query: () => ({
        url: `${CHAT_URL}/userchats`,
      }),
      providesTags: ["Chats"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetChatByIdQuery,
  useGetAllChatByUserQuery,
} = chatApiSlice;
