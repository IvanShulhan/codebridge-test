import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Article } from '../../types/Article';

const url = 'https://api.spaceflightnewsapi.net/v3/articles';

export interface ArticlesState {
  articles: Article[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ArticlesState = {
  articles: [],
  status: 'idle',
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await fetch(url);
    return await response.json();
  }
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'idle';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectArticles = (state: RootState) => state.articles;
export default articlesSlice.reducer;
