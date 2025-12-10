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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBlogs: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => `blog?page=${page}&pageSize=${pageSize}`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => response?.data ?? {},
    }),
    getBlogById: builder.query<BlogItem | null, string>({
      query: (id) => `blog/${id}`,
    //   eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => response?.data?.blog ?? null,
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogByIdQuery } = blogApi;