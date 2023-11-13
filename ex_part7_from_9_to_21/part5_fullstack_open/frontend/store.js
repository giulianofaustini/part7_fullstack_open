import { configureStore } from "@reduxjs/toolkit";


import notificationReducer from './bloglist-frontend/src/reducers/notificationReducer'
import blogsReducer from './bloglist-frontend/src/reducers/blogsReducer'


const store = configureStore({

reducer:{
    notifications: notificationReducer,
    blogs: blogsReducer
} 
})

export default store

