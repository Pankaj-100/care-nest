import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ServiceItem = {
  id: string;
  serviceName?: string;
  serviceDescription?: string;
  serviceIcon?: string;
  careType?: string;
  title1?: string;
  description1?: string;
  title2?: string;
  description2?: string;
  title3?: string;
  description3?: string;
  description3Image?: string;
  description3List?: string[];
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE.replace(/\/$/, "")}/api/v1/`,
  }),
  endpoints: (builder) => ({
    getHomepageServices: builder.query<ServiceItem[], void>({
      query: () => `service-cms/homepage`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (res: any) => res?.data?.services ?? [],
    }),
    getServicesByType: builder.query<ServiceItem[], string>({
      // type example: "Personal Care"
      query: (type) => `service-cms/care-type/${encodeURIComponent(type)}`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (res: any) => res?.data?.services ?? [],
    }),
  }),
});

export const { useGetHomepageServicesQuery, useGetServicesByTypeQuery } = serviceApi;
export default serviceApi;