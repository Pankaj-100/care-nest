import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import bookingReducer from './slices/bookingSlice';
import { authApi } from './api/authApi';
import { profileApi } from './api/profileApi';
import { bookingApi } from './api/bookingApi';
import { blogApi } from './api/blogApi';
import { serviceApi } from './api/serviceApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    booking: bookingReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      bookingApi.middleware,
      blogApi.middleware,
      serviceApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
