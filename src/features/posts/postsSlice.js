import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://640114a00a2a1afebee5c77d.mockapi.io/post1');
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post('https://640114a00a2a1afebee5c77d.mockapi.io/post1', initialPost);
  return response.data;
});

export const handleDelete = createAsyncThunk('posts/handleDelete', async (id) => {
  const response = await axios.delete(`https://640114a00a2a1afebee5c77d.mockapi.io/post1/${id}`);
  return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content }) => {
  await axios.put(`https://640114a00a2a1afebee5c77d.mockapi.io/post1/${id}`, {
    title,
    content,
  });
  return { id, title, content };
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = state.posts.concat(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(handleDelete.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.posts = state.posts.filter((post) => post.id !== id);
        state.status = 'succeeded';
      })
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, title, content } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
        }
        state.status = 'succeeded';
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
      })
    }
  })
export default postsSlice.reducer;
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);