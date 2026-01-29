// api/notificationApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  NotificationsResponse,
  UnreadCountResponse,
} from '../../lib/types/notification';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Notifications', 'UnreadCount'],
  endpoints: (builder) => ({
    // Get notifications with pagination
    getNotifications: builder.query<
      NotificationsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: '/api/v1/notifications',
        params: { page, limit },
      }),
      providesTags: ['Notifications'],
    }),

    // Get unread count
    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => '/api/v1/notifications/count',
      providesTags: ['UnreadCount'],
    }),

    // Mark notification as read
    markAsRead: builder.mutation<
      { success: boolean; message: string; data: { notification: Notification } },
      string
    >({
      query: (notificationId) => ({
        url: `/api/v1/notifications/${notificationId}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notifications', 'UnreadCount'],
    }),

    // Mark all as read (optional - you need to add this endpoint in backend)
    markAllAsRead: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/api/v1/notifications/read-all',
        method: 'PUT',
      }),
      invalidatesTags: ['Notifications', 'UnreadCount'],
    }),
    deleteNotification: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/v1/notifications/${id}`,
        method: 'DELETE',
      }),
    }),
    clearAllNotifications: builder.mutation<any, void>({
      query: () => ({
        url: `/api/v1/notifications/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useLazyGetNotificationsQuery,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
} = notificationApi;