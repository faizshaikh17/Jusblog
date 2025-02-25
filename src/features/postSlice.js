import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import databaseService from "../appwrite/config";

const initialState = {
    posts: [],
    loading: false,
    error: null,

}

export const fetchPosts = createAsyncThunk("fetchPosts",
    async () => {
        const res = await databaseService.getPosts([]);
        return res.documents;
    })

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload; // THIS IS VERY IMPORTANT - REPLACES THE ARRAY
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default postSlice.reducer;