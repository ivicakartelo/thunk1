import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchposts', async () => {
    const response = await axios.get('https://640114a00a2a1afebee5c77d.mockapi.io/post1')
    return response.data
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost) => {
        const response = await axios.post('https://640114a00a2a1afebee5c77d.mockapi.io/post1', initialPost)
        return response.data
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
    }
})

export default postsSlice.reducer
export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) => 
    state.posts.posts.find(post => post.id === postId)