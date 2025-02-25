import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import databaseService from "../appwrite/config";

const initialState = {
    posts: [],
    
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
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
    }
})

export default postSlice.reducer;