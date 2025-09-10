import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { setAccessToken, clearAuth } from '../authSlice';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from '../store';

interface RefreshTokenResponse {
  accessToken: string;
}

interface Caregiver {
  id: string;
  name: string;
  avatar: string;
  price: number;
  experience: number;
  services: string[];
  isBookmarked?: boolean;
}

interface SearchCaregiversResponse {
  success: boolean;
  message: string;
  data: {
    caregivers: Caregiver[];
  };
}

interface CaregiverDetails {
  id: string;
  avatar: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  experience: number;
  price: number;
  about: string;
  services: string[];
  whyChooseMe: Array<{ title: string; description: string }>;
}

interface Service {
  id: string;
  name: string;
  zipcode: string;
}

interface ServiceNamesResponse {
  success: boolean;
  messages: string;
  data: { services: Service[] };
}

interface CaregiverDetailsResponse {
  success: boolean;
  message: string;
  data: { details: CaregiverDetails[] };
}

interface BookingRequest {
  appointmentDate: string;
  serviceId: string;
  durationInDays: string;
  selectedCaregivers: string[];
}

interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    bookingId: string;
    appointmentDate: string;
    durationInDays: string;
    status: string;
  };
}

interface RecentBookingCaregiver {
  id: string | null;
  name: string;
  avatar: string | null;
  isFinalSelection: boolean | null;
  experience: number | null;
  price: number | null;
  isDeleted: boolean;
}

interface RecentBooking {
  bookingId: string;
  bookedOn: string;
  appointmentDate: string;
  duration: number;
  status: string;
  caregivers: RecentBookingCaregiver[];
}

interface RecentBookingsResponse {
  success: boolean;
  message: string;
  data: { bookings: RecentBooking[] };
}

interface CancelBookingResponse {
  success: boolean;
  message: string;
}

interface CancelBookingRequest {
  bookingId: string;
  caregiverId: string;
}

// Require zipcode; other params optional
export interface SearchCaregiversParams {
  zipcode: string;
  serviceId?: string;
  gender?: string;
  certified?: boolean;
  minPrice?: number;
  maxPrice?: number;
  languages?: string; // CSV
}

// --------- Base URLs ---------
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set.");

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const refreshQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/v1/user`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.refreshToken;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args, api, extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(clearAuth());
      return result;
    }

    try {
      const refreshResult = await refreshQuery(
        { url: '/new-access-token', method: 'POST' }, api, extraOptions
      );

      if (refreshResult?.error?.status === 401 || refreshResult?.error?.status === 404) {
        api.dispatch(clearAuth());
        return result;
      }

      if (refreshResult?.data) {
        const { accessToken } = refreshResult.data as RefreshTokenResponse;
        api.dispatch(setAccessToken(accessToken));
        Cookies.set('authToken', accessToken);
        result = await baseQuery(args, api, extraOptions);
      }
    } catch {
      api.dispatch(clearAuth());
      return result;
    }
  }

  return result;
};

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({

    // Search caregivers by zipcode (other filters optional)
    searchCaregivers: builder.query<SearchCaregiversResponse, SearchCaregiversParams>({
      query: (params) => {
        // remove empty values so backend only receives provided filters
        const cleaned = Object.fromEntries(
          Object.entries(params).filter(([_, v]) => {
            if (v === undefined || v === null) return false;
            if (typeof v === 'string' && v.trim() === '') return false;
            if (typeof v === 'number' && Number.isNaN(v)) return false;
            return true;
          })
        );
        return {
          url: '/api/v1/giver/search',
          method: 'GET',
          params: cleaned,
        };
      },
    }),

    getCaregiverDetails: builder.query<CaregiverDetailsResponse, string>({
      query: (caregiverId) => ({
        url: `/api/v1/giver/search/${caregiverId}`,
        method: 'GET',
      }),
    }),

    createBooking: builder.mutation<BookingResponse, BookingRequest>({
      query: (bookingData) => ({
        url: '/api/v1/booking',
        method: 'POST',
        body: bookingData,
      }),
    }),

    getServiceNames: builder.query<ServiceNamesResponse, void>({
      query: () => ({
        url: '/api/v1/service/names',
        method: 'GET',
      }),
    }),

    getRecentBookings: builder.query<RecentBookingsResponse, string | undefined>({
      query: (status) => ({
        url: `/api/v1/booking/recent/user`,
        method: 'GET',
        params: status ? { status } : undefined,
      }),
    }),

    cancelBooking: builder.mutation<CancelBookingResponse, CancelBookingRequest>({
      query: ({ bookingId, caregiverId }) => ({
        url: `/api/v1/booking/${bookingId}/cancel/user`,
        method: 'PUT',
        body: { caregiverId },
      }),
    }),

  }),
});

export const {
  useSearchCaregiversQuery,
  useGetCaregiverDetailsQuery,
  useCreateBookingMutation,
  useGetServiceNamesQuery,
  useGetRecentBookingsQuery,
  useCancelBookingMutation,
} = bookingApi;