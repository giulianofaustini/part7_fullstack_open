import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
  user: null,
}

const blogSlice = createSlice({

  name: 'blogs',
  initialState,
  reducers:{
    setBlogs: (state, action) => {
      state.blogs = action.payload
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload)
    },
    updateBlogLikes: (state, action) => {
      const { id, likes } = action.payload.id
      const blogToUpdate = state.blogs.find((blog) => blog.id === id)
      if(blogToUpdate) {
        return blogToUpdate.likes = likes
      }
    },
    deleteBlog: (state, action) => {
      const id = action.payload
      state.blogs = state.blogs.filter((blog) => blog.id === id)
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  }
}
)


export const { setBlogs , addBlog , updateBlogLikes , deleteBlog , setUser } = blogSlice.actions

export default blogSlice.reducer

