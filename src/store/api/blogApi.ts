import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type BlogItem = {
  id: string;
  mainImage?: string;
  title?: string;
  description?: string;
  authorName?: string;
  authorProfilePic?: string;
  blogDate?: string;
  content?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE.replace(/\/$/, "")}/api/v1/` }),
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogItem[], void>({
      query: () => `blog`,
      // return normalized array so consumers get blogs directly
    //   eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => response?.data?.blogs ?? [],
    }),
    getBlogById: builder.query<BlogItem | null, string>({
      query: (id) => `blog/${id}`,
    //   eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => response?.data?.blog ?? null,
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogByIdQuery } = blogApi;