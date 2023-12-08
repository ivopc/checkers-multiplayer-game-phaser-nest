import { configureStore } from '@reduxjs/toolkit';
import userReducers from './user.store';
import chatReducers from './chat.store';
import modalReducers from './modal.store';

export const store = configureStore({
  reducer: {
    user: userReducers,
    chat: chatReducers,
    modal: modalReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
