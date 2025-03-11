import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './Reducer/postsSlice';
import userReducer from './Reducer/userSlice'

const store = configureStore({
    reducer :{
        user: userReducer,
        posts: postsReducer,
    }
})

export default store;