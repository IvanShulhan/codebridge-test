import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Article } from '../../types/Article';

const url = 'https://api.spaceflightnewsapi.net/v3/articles';

export interface ArticlesState {
  article: Article | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ArticlesState = {
  article: null,
  status: 'idle',
};

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id: string) => {
    const response = await fetch(`${url}/${id}`);
    return await response.json();
  }
);

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.article = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectArticle = (state: RootState) => state.article;
export default articleSlice.reducer;
