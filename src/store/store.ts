import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articlesSlice';
import articleReducer from './slices/articleSlice';


export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
