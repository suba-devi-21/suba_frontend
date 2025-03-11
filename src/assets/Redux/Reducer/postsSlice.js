import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((post) => post._id !== action.payload);
    },
    editPost: (state, action) => {
      const updatedPost = action.payload;
      const index = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
    likePost: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.find((post) => post._id === postId);
      if (post && !post.likes.includes(userId)) {
        post.likes.push(userId);
      }
    },
    commentPost: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.find((post) => post._id === postId);
      if (post) {
        post.comments = post.comments || [];
        post.comments.push(comment);
      }
    },
  },
});

export const { addPost, deletePost, editPost, likePost, commentPost } = postsSlice.actions;
export default postsSlice.reducer;
